'use strict';
const angular = require('angular');

export default angular.module('webarmatureApp.sidebar', [])
  .directive('sidebar', function () {

    function link(scope, element, attrs) {

      scope.accordion = scope.groupName + "Accordion";

      let defaultMapConfig = {
        center: [45.7604276, 4.8335709],
        zoom: 16,
        maxZoom: 18,
        minZoom: 13
      };

      let mapId = $(element).parent().attr("id");
      let sidebarId = element.attr("id");
      let sidebarGroupName = scope.groupName;

      scope.map = L.map(mapId, defaultMapConfig);
      scope.maps.push(scope.map);

      syncMaps();

      scope.map.zoomControl.setPosition('topright');

      L.control.sidebar(sidebarId).addTo(scope.map);

      let OSM = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      });

      scope.map.addLayer(OSM);

      $("input[type=radio]").on('switchChange.bootstrapSwitch', function (e, s) {

        if(this.checked){
          //Create the new layer
          let layerName = this.value;
          let attribution = this.alt;
          let groupId = $(this).closest("div[id]").attr("id");
          let layer = L.tileLayer.wms('http://a.map.webarmature.fr/geoserver/wms/', {
            layers: layerName,
            transparent: true,
            attribution: attribution
          });

          if(this.name == sidebarGroupName) {
            removeAllMapLayers(scope.map);
            if (layerName != "OSM") {
              scope.map.addLayer(layer);
            }
            else {
              scope.map.addLayer(OSM);
            }
          }

          if(groupId == "landsatGroup" || groupId == "spotGroup"){
            scope.map.setZoom(13);
          }

          syncMaps();
        }
      });

      function removeAllMapLayers(map) {
        map.eachLayer(function (layer) {
          map.removeLayer(layer);
        });
      }

      function syncMaps(){
        for(let i=0; i < scope.maps.length -1; i++){
          let firstMap = scope.maps[i];
          let secondMap = scope.maps[i+1];
          firstMap.sync(secondMap, {syncCursor: true});
          secondMap.sync(firstMap, {syncCursor: true});
        }
      }

      $("#mapsArea").click(function (event) {
        if (!$(event.target).closest("#"+sidebarId).length) {
          if (!($("#"+sidebarId).hasClass("collapsed"))) {
            $("#"+sidebarId).addClass("collapsed");
            $("#"+sidebarId).find("li").each(function () {
              $(this).removeClass("active");
            });
            $().addClass("collapsed");
          }
        }
      });

      scope.addSelected = function(event){

        if (!(angular.element(event.target).hasClass("selected"))) {
          $(".sidebarButton").each(function () {
            $(this).removeClass("selected");
          });
          angular.element(event.target).addClass("selected");
        }
        else {
          angular.element(event.target).removeClass("selected");
        }

      };
    }

    return {
      restrict: 'E',
      scope: {
        maps: '=',
        groupName: '='
      },
      template: require('./sidebar.html'),
      link: link,
      controller: 'sidebarController'
    }
  })
  .controller('sidebarController', ['$scope', '$timeout', function($scope, $timeout){

    //Dirty hack to make bootstrap switch work if there is more than one use of the directive on the page
    $timeout( function(){
      $(".bs").bootstrapSwitch('state', false);
    }, 0);

  }])
  .name;
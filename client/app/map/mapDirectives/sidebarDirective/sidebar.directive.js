'use strict';
const angular = require('angular');
import "../L.TileLayer.BetterWMS";

export default angular.module('webarmatureApp.sidebar', [])
  .directive('sidebar', function () {

    function link(scope, element, attrs, MapInfo) {

      let geoServerBaseUrl = 'http://a.map.webarmature.fr/geoserver/wms/';
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

      $("input[type=checkbox]").on('change', function(){
        if(this.checked){
          $("input[type=checkbox]").prop("checked", true);
          L.tileLayer.wms(geoServerBaseUrl, {
            layers: 'towns_border-d2015',
            transparent: true,
            format: 'image/png'
          }).addTo(scope.map);
        }
        else{
          $("input[type=checkbox]").prop("checked", false);
          scope.map.eachLayer(function (layer) {
            if(layer.options.layers == "towns_border-d2015"){
              scope.map.removeLayer(layer);
            }
          });
        }
      });

      $("input[type=radio]").on('switchChange.bootstrapSwitch', function (e, s) {

        if(this.checked){
          //Create the new layer
          let layerName = this.value;
          let attribution = this.alt;
          let groupId = $(this).closest("div[id]").attr("id");
          let layer = L.tileLayer.wms(geoServerBaseUrl, {
            layers: layerName,
            transparent: true,
            attribution: attribution
          });

          if(groupId == "spotMeshGroup" || groupId == "landsatMeshGroup"){
            layer = L.tileLayer.betterWms(geoServerBaseUrl, {
              layers: layerName,
              transparent: true,
              attribution: attribution,
              format: 'image/png'
            });
          }

          if(this.name == sidebarGroupName) {
            removeAllMapLayers(scope.map);
            if (layerName == "OSM") {
              scope.map.addLayer(OSM);
              OSM.bringToBack();
            }
            else {
              scope.map.addLayer(layer);
              layer.bringToBack();
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
          if(layer.options.layers != "towns_border-d2015"){
            map.removeLayer(layer);
          }
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

      //Close sidebarDirective when clicking outside of it
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

      //Add style to accordion button when opening them
      //And remove style from other accordion buttons
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


      scope.getTownInfo = function(townName){

        var params = {
          request: 'GetFeature',
          service: 'WFS',
          srs: 'EPSG:2154',
          version: "2.0.0",
          typeNames: "test:towns_border-d2015",
          CQL_Filter: "NOM_COM= '"+townName+"'",
          outputFormat: 'application/json'
        };

        let url = geoServerBaseUrl + L.Util.getParamString(params, geoServerBaseUrl, true);

        $.ajax({
          url: "/api/mapInfo/town",
          data: {
            url: url
          },
          success: function (data) {
            console.log(data);
          }
        });
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

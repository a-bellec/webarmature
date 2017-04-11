'use strict';
const angular = require('angular');
import "../L.TileLayer.BetterWMS";

export default angular.module('webarmatureApp.sidebar', [])
  .directive('sidebar', function () {

    function link(scope, element, attrs) {

      let sidebarGroupName = scope.groupName;

      setTimeout(function () {
        let sidebarId = element.attr("id");
        L.control.sidebar(sidebarId).addTo(scope.map);
      }, 0);

      $("input[type=checkbox]").on('change', function(){
        if(this.checked){
          $("input[type=checkbox]").prop("checked", true);
          L.tileLayer.wms(scope.geoServerBaseUrl, {
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
          let layer = L.tileLayer.wms(scope.geoServerBaseUrl, {
            layers: layerName,
            transparent: true,
            attribution: attribution
          });

          if(groupId == "spotMeshGroup" || groupId == "landsatMeshGroup"){
            layer = L.tileLayer.betterWms(scope.geoServerBaseUrl, {
              layers: layerName,
              transparent: true,
              attribution: attribution,
              format: 'image/png'
            });
          }

          if(this.name == sidebarGroupName) {
            removeAllMapLayers(scope.map);
            if (layerName == "OSM") {
              scope.map.addLayer(scope.OSMLayer);
              scope.OSMLayer.bringToBack();
            }
            else {
              scope.map.addLayer(layer);
              layer.bringToBack();
            }
          }

          if(groupId == "landsatGroup" || groupId == "spotGroup"){
            scope.map.setZoom(13);
          }

          scope.syncMaps();
        }
      });

      function removeAllMapLayers(map) {
        map.eachLayer(function (layer) {
          if(layer.options.layers != "towns_border-d2015"){
            map.removeLayer(layer);
          }
        });
      }

    }
    return {
      restrict: 'E',
      transclude: true,
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

'use strict';
const angular = require('angular');

export default angular.module('webarmatureApp.sidebar', [])
  .directive('sidebar', function () {

    function link(scope, element, attrs, MapInfo) {

      L.TileLayer.BetterWMS = L.TileLayer.WMS.extend({

        onAdd: function (map) {
          // Triggered when the layer is added to a map.
          //   Register a click listener, then do all the upstream WMS things
          L.TileLayer.WMS.prototype.onAdd.call(this, map);
          map.on('click', this.getFeatureInfo, this);
        },

        onRemove: function (map) {
          // Triggered when the layer is removed from a map.
          //   Unregister a click listener, then do all the upstream WMS things
          L.TileLayer.WMS.prototype.onRemove.call(this, map);
          map.off('click', this.getFeatureInfo, this);
        },

        getFeatureInfo: function (evt) {
          // Make an AJAX request to the server and hope for the best
          let url = this.getFeatureInfoUrl(evt.latlng),
            showResults = L.Util.bind(this.showGetFeatureInfo, this);

          var getMapInfo = function(){
            $.ajax({
              url: "/api/mapInfo",
              data: {
                url: url
              },
              success: function (data) {
                var err = typeof data.body === 'string' ? null : data.body;
                showResults(err, evt.latlng, data.body);
              }
            });
          };

          getMapInfo();

        },

        getFeatureInfoUrl: function (latlng) {
          // Construct a GetFeatureInfo request URL given a point
          var point = this._map.latLngToContainerPoint(latlng, this._map.getZoom()),
            size = this._map.getSize(),

            params = {
              request: 'GetFeatureInfo',
              service: 'WMS',
              srs: 'EPSG:4326',
              styles: this.wmsParams.styles,
              transparent: this.wmsParams.transparent,
              version: this.wmsParams.version,
              format: this.wmsParams.format,
              bbox: this._map.getBounds().toBBoxString(),
              height: size.y,
              width: size.x,
              layers: this.wmsParams.layers,
              query_layers: this.wmsParams.layers,
              info_format: 'text/html'
            };

          params[params.version === '1.3.0' ? 'i' : 'x'] = point.x;
          params[params.version === '1.3.0' ? 'j' : 'y'] = point.y;

          return this._url + L.Util.getParamString(params, this._url, true);
        },

        showGetFeatureInfo: function (err, latlng, content) {
          if (err) { console.log(err); return; }

          L.popup({ maxWidth: 800})
            .setLatLng(latlng)
            .setContent(content)
            .openOn(this._map);
        }
      });

      L.tileLayer.betterWms = function (url, options) {
        return new L.TileLayer.BetterWMS(url, options);
      };

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
          L.tileLayer.betterWms('http://a.map.webarmature.fr/geoserver/wms/', {
            layers: 'towns_border-d2015',
            transparent: true,
            format: 'image/png'
          }).addTo(scope.map);
        }
        else{
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
          let layer = L.tileLayer.wms('http://a.map.webarmature.fr/geoserver/wms/', {
            layers: layerName,
            transparent: true,
            attribution: attribution
          });

          if(this.name == sidebarGroupName) {
            removeAllMapLayers(scope.map);
            if (layerName != "OSM") {
              scope.map.addLayer(layer);
              layer.bringToBack();
            }
            else {
              scope.map.addLayer(OSM);
              OSM.bringToBack();
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

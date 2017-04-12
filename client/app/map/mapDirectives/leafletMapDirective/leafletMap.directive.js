'use strict';
const angular = require('angular');
const proj4 = require("proj4");

import statArea from '../statAreaDirective/statArea.directive';
import sidebar from '../sidebarDirective/sidebar.directive';
import tour from '../tourDirective/tour.directive';
import printMap from '../printMapDirective/printMap.directive';

export default angular.module('webarmatureApp.leafletMap', [statArea, sidebar, tour, printMap])
  .directive('leafletMap', function () {

    function link(scope, element, attrs) {

      scope.geoServerBaseUrl = 'http://a.map.webarmature.fr/geoserver/wms/';
      let defaultMapConfig = {
        center: [45.7604276, 4.8335709],
        zoom: 16,
        maxZoom: 18,
        minZoom: 13
      };

      let mapId = element.attr("id");

      scope.map = L.map(mapId, defaultMapConfig);
      scope.maps.push(scope.map);

      scope.syncMaps = function(){
        for(let i=0; i < scope.maps.length -1; i++){
          let firstMap = scope.maps[i];
          let secondMap = scope.maps[i+1];
          firstMap.sync(secondMap, {syncCursor: true});
          secondMap.sync(firstMap, {syncCursor: true});
        }
      };

      scope.syncMaps();

      scope.map.zoomControl.setPosition('topright');

      scope.OSMLayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      });

      scope.map.addLayer(scope.OSMLayer);

      //Close sidebarDirective when clicking outside of it
      $("#mapsArea").click(function (event) {
        if (!$(event.target).closest("#"+scope.sidebarId).length) {
          if (!($("#"+scope.sidebarId).hasClass("collapsed"))) {
            $("#"+scope.sidebarId).addClass("collapsed");
            $("#"+scope.sidebarId).find("li").each(function () {
              $(this).removeClass("active");
            });
            $().addClass("collapsed");
          }
        }
      });

    }
    return {
      restrict: 'E',
      scope: {
        maps: '=',
        sidebarId: '=',
        chartId: '=',
        groupName: '='
      },
      template: require('./leafletMap.html'),
      link: link,
      controller: 'leafletMapController'
    }
  })
  .controller('leafletMapController', ['$scope', function($scope){

    $scope.getTownInfo = function(townName){

      var params = {
        request: 'GetFeature',
        service: 'WFS',
        srs: 'EPSG:2154',
        version: "2.0.0",
        typeNames: "towns_border-d2015",
        CQL_Filter: "NOM_COM= '"+townName+"'",
        outputFormat: 'application/json'
      };

      let url = $scope.geoServerBaseUrl + L.Util.getParamString(params, $scope.geoServerBaseUrl, true);

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

    let getMapInfoUrl = function(layerName){
      let mapBounds = $scope.map.getBounds();

      //Change projection to EPSG:2154
      proj4.defs('EPSG:2154', "+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ");
      let southWest = proj4('EPSG:2154', [mapBounds._southWest.lng, mapBounds._southWest.lat]);
      let northEast = proj4('EPSG:2154', [mapBounds._northEast.lng, mapBounds._northEast.lat]);

      let coordinateArray = [southWest[0], southWest[1], northEast[0], northEast[1]];
      let coordinateArrayString = "" + coordinateArray[0] + "," + coordinateArray[1] + "," + coordinateArray[2] + "," + coordinateArray[3];

      // Construct a GetFeature request URL given a box
      var params = {
        request: 'GetFeature',
        service: 'WFS',
        srs: 'EPSG:2154',
        version: "2.0.0",
        bbox: coordinateArrayString,
        typeNames: layerName,
        outputFormat: 'application/json',
        propertyName: "percent_aa"
      };

      return $scope.geoServerBaseUrl + L.Util.getParamString(params, $scope.geoServerBaseUrl, true);
    };

    let setChartData = function(data){
      let newDataset = [];
      let dataToShow = {"darkGreen": 0, "lightGreen" : 0, "yellow": 0, "orange": 0, "red": 0};
      for(let point of data){

        let label = "";
        if(point <= 20){
          dataToShow.darkGreen++;
        }
        else if(point > 20 && point <= 40){
          dataToShow.lightGreen++;
        }
        else if(point > 40 && point <= 60){
          dataToShow.yellow++;
        }
        else if(point > 60 && point <= 80){
          dataToShow.orange++;
        }
        else{
          dataToShow.red++;
        }

      }

      $scope.dataToShow = dataToShow;

      for(let key in dataToShow){
        newDataset.push({"label": key, "count": dataToShow[key]});
      }

      $scope.dataset.impermeable = newDataset;
      $scope.$apply();
    };

    $scope.getMapInfo = function(layerName){
      let url = getMapInfoUrl(layerName);

      $.ajax({
        url: "/api/mapInfo",
        data: {
          url: url
        },
        success: function (data) {
          setChartData(data);
        }
      });
    };

    let getDataToAdd = function (data) {

      try{
        let dataJson = JSON.parse(data);

        //If pointing outside show generic message
        if (!dataJson.features.length > 0) {
          return "Aucune donnée";
        }

        let dataProperties = dataJson.features[0].properties;
        let percent = +dataProperties.percent_aa.toFixed(2);

        //If value are outside of possible scope show generic message
        if (percent < 0 || percent > 100) {
          return "Donnée non disponible";
        }

        return percent.toString();
      }
      catch(err){
        return "Erreur";
      }

    };

    let showGetFeatureInfo = function (err, latlng, data) {
      if (err) {
        console.log(err);
        return;
      }

      let percent = getDataToAdd(data);

      var popup = L.popup({maxWidth: 800})
        .setLatLng(latlng)
        .openOn($scope.map)
        .setContent("Imperméable: " + percent);
    };

    let getFeatureInfoUrl = function (latlng, layerName) {

      let wmsParams = L.TileLayer.WMS.prototype.defaultWmsParams;

      // Construct a GetFeatureInfo request URL given a point
      let point = $scope.map.latLngToContainerPoint(latlng, $scope.map.getZoom());
      let size = $scope.map.getSize();

      let params = {
          request: 'GetFeatureInfo',
          service: 'WMS',
          srs: 'EPSG:4326',
          styles: wmsParams.styles,
          transparent: wmsParams.transparent,
          version: wmsParams.version,
          format: wmsParams.format,
          bbox: $scope.map.getBounds().toBBoxString(),
          height: size.y,
          width: size.x,
          layers: layerName,
          query_layers: layerName,
          info_format: 'application/json',
          propertyName: "percent_aa"
      };

      params[params.version === '1.3.0' ? 'i' : 'x'] = point.x;
      params[params.version === '1.3.0' ? 'j' : 'y'] = point.y;

      return $scope.geoServerBaseUrl + L.Util.getParamString(params, $scope.geoServerBaseUrl, true);
    };

    $scope.getFeatureInfo = function (evt, layerName) {
      // Make an AJAX request to the server and hope for the best
      let url = getFeatureInfoUrl(evt.latlng, layerName);

      let getPointInfo = function () {
        $.ajax({
          url: "/api/mapInfo/pointInfo",
          data: {
            url: url
          },
          success: function (data) {
            let err = typeof data === 'string' ? null : data;
            showGetFeatureInfo(err, evt.latlng, data);
          }
        });
      };

      //If not clicking inside the sidebarDirective getPointInfo
      if (!$(evt.originalEvent.srcElement).closest("sidebarDirective").length) {
        getPointInfo();
      }
    };

    //Add style to accordion button when opening them
    //And remove style from other accordion buttons
    $scope.addSelected = function(event){
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

  }])
  .name;

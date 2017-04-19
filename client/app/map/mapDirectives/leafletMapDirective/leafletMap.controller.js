'use strict';

export default class leafletMapController {

  /*@ngInject*/
  constructor($scope, $timeout, MapInfo) {

    $scope.geoServerBaseUrl = MapInfo.getGeoserverBaseUrl();

    $scope.getTownInfo = function (townName) {

      var params = {
        request: 'GetFeature',
        service: 'WFS',
        srs: 'EPSG:2154',
        version: "2.0.0",
        typeNames: "towns_border-d2015",
        CQL_Filter: "NOM_COM= '" + townName + "'",
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

    let setChartData = function (data) {
      let newDataset = [];

      $scope.dataAverage = data.averagePercent;

      for (let i = 0; i < data.percentPerSection.length; i++) {
        newDataset.push({"label": i, "count": data.percentPerSection[i] });
      }

      $scope.dataset.impermeable = newDataset;
    };

    $scope.getMapInfo = function (layerName) {

      MapInfo.getMapInfo({
        map: $scope.map,
        layerName: layerName
      })
        .then((res) => {
          setChartData(res);
        });
    };

    let getDataToAdd = function (data) {

      try {
        //If pointing outside show generic message
        if (!data.features.length > 0) {
          return "Aucune donnée";
        }

        let dataProperties = data.features[0].properties;
        let percent = +dataProperties.percent_aa.toFixed(2);

        //If value are outside of possible scope show generic message
        if (percent < 0 || percent > 100) {
          return "Donnée non disponible";
        }

        return percent.toString();
      }
      catch (err) {
        return "Erreur";
      }

    };

    let showGetFeatureInfo = function (latlng, data) {
      let percent = getDataToAdd(data);

      var popup = L.popup({maxWidth: 800})
        .setLatLng(latlng)
        .openOn($scope.map)
        .setContent("Imperméable: " + percent);
    };

    $scope.getFeatureInfo = function (evt, layerName) {
      //If not clicking inside the sidebarDirective getPointInfo
      if (!$(evt.originalEvent.srcElement).closest("sidebar").length) {

        MapInfo.getFeatureInfo({
          map: $scope.map,
          layerName: layerName,
          event: evt
        })
          .then((res) => {
            showGetFeatureInfo(evt.latlng, res);
          });
      }
    };

    let removeAllMapLayers = function (map) {
      map.clearAllEventListeners();

      map.eachLayer(function (layer) {
        if (layer.options.layers != "towns_border-d2015") {
          map.removeLayer(layer);
        }
      });

      $scope.showStat = false;
      $scope.$apply();
    };

    let addMapEvents = function (layerName) {
      //Defining the function to call directly seem to throw an error where leaflet can't properly get a callback
      //calling the function inside the callback doesn't throw an error
      $scope.map.on('click', function (event) {
        $scope.getFeatureInfo(event, layerName);
      });

      //TODO send a pull request to leaflet.sync to make them change their moveend trigger to a move trigger
      $scope.map.on('moveend syncmoveend', function () {
        $scope.getMapInfo(layerName);
      });

      $scope.syncMoveEndTrigger = function () {
        if (typeof $scope.map._syncMaps != "undefined") {
          $scope.map._syncMaps.forEach(function (toSync) {
            toSync.fire('syncmoveend');
          });
        }
      };

      $scope.map.on('moveend', $scope.syncMoveEndTrigger, this);
    };

    $scope.changeLayer = function (layerName, attribution, groupId, itemName) {
      let layer = L.tileLayer.wms($scope.geoServerBaseUrl, {
        layers: layerName,
        transparent: true,
        attribution: attribution,
        format: 'image/png'
      });

      if (itemName == $scope.groupName) {
        removeAllMapLayers($scope.map);
        if (layerName == "OSM") {
          $scope.map.addLayer($scope.OSMLayer);
          $scope.OSMLayer.bringToBack();
        }
        else {
          $scope.map.addLayer(layer);
          layer.bringToBack();
        }

        //Create events for classification layers
        let classificationGroup = ['meshGroup', 'irisGroup', 'townGroup'];
        for (let group of classificationGroup) {
          if (groupId == group) {
            addMapEvents(layerName);

            $scope.map.setZoom(13);
            break;
          }
        }
      }

      if (groupId == "landsatGroup" || groupId == "spotGroup") {
        $scope.map.setZoom(13);
      }

      $scope.syncMaps();
    };

    $scope.addTownBorders = function () {
      L.tileLayer.wms($scope.geoServerBaseUrl, {
        layers: 'towns_border-d2015',
        transparent: true,
        format: 'image/png'
      }).addTo($scope.map);
    };

    $scope.removeTownBorders = function () {
      $scope.map.eachLayer(function (layer) {
        if (layer.options.layers == "towns_border-d2015") {
          $scope.map.removeLayer(layer);
        }
      });
    };
  }

  $onInit() {

  }

}


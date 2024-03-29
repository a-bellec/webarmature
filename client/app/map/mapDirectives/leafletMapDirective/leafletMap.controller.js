/* eslint-disable camelcase */
'use strict';

const L = require('leaflet');
const proj4 = require('proj4');

export default class leafletMapController {

  /*@ngInject*/
  constructor($scope, $timeout, $q, MapInfo, Auth) {
    $scope.isLoggedIn = Auth.isLoggedInSync();

    $scope.geoServerBaseUrl = MapInfo.getGeoserverBaseUrl();

    let setChartData = function(data) {
      let newDataset = [];

      $scope.dataAverage = data.averagePercent;

      for(let i = 0; i < data.percentPerSection.length; i++) {
        newDataset.push({label: i, count: data.percentPerSection[i] });
      }

      $scope.dataset.impermeableOld = $scope.dataset.impermeable;
      $scope.dataset.impermeable = newDataset;
    };

    $scope.getMapInfo = function(layerName) {

      MapInfo.getMapInfo({
        map: $scope.map,
        layerName
      })
        .then(res => {
          setChartData(res);
        });
    };

    let getDataToAdd = function(data) {
      try {
        //If pointing outside show generic message
        if(!data.features.length > 0) {
          return 'Aucune donnée';
        }

        let dataProperties = data.features[0].properties;
        let percent = +dataProperties.percent_aa.toFixed(2);

        //If value are outside of possible scope show generic message
        if(percent < 0 || percent > 100) {
          return 'Donnée non disponible';
        }

        return (percent.toString()) + "%";
      } catch(err) {
        return 'Erreur';
      }
    };

    let showGetFeatureInfo = function(latlng, data) {
      let percent = getDataToAdd(data);

      L.popup({maxWidth: 800})
        .setLatLng(latlng)
        .openOn($scope.map)
        .setContent(`Imperméable : ${percent}`);
    };

    $scope.getFeatureInfo = function(evt, layerName) {
      //If clicking directly on the map
      if($(evt.originalEvent.target).is('leaflet-map')) {
        MapInfo.getFeatureInfo({
          map: $scope.map,
          layerName,
          event: evt
        })
          .then(res => {
            showGetFeatureInfo(evt.latlng, res);
          });
      }
    };

    let removeAllMapLayers = function(map) {
      map.removeEventListener("moveend");
      map.removeEventListener("click");

      map.eachLayer(function(layer) {
        map.removeLayer(layer);
      });

      $scope.showStat = false;
      $scope.showLegend = false;
      $scope.$apply();
    };

    let addMapEvents = function(layerName) {
      //Defining the function to call directly seem to throw an error where leaflet can't properly get a callback
      //calling the function inside the callback doesn't throw an error
      $scope.map.on('click', function(event) {
        $scope.getFeatureInfo(event, layerName);
      });

      $scope.map.on('moveend', function() {
        $scope.getMapInfo(layerName);
      });

    };

    $scope.syncMaps = function() {
      for(let i = 0; i < $scope.maps.length - 1; i++) {
        let firstMap = $scope.maps[i];
        let secondMap = $scope.maps[i + 1];
        firstMap.sync(secondMap, {syncCursor: true});
        secondMap.sync(firstMap, {syncCursor: true});

        //Fix an issue with moveend being called multiple times on zoomend
        //Can't be fixed directly in leaflet.sync because the plugin needs this event with more than 2 maps
        firstMap.off('zoomend');
        secondMap.off('zoomend');
      }
    };

    $scope.changeLayer = function(layerName, attribution, groupId, itemName) {

      $scope.showStat = false;

      let layer = L.tileLayer.wms($scope.geoServerBaseUrl, {
        layers: layerName,
        transparent: true,
        attribution,
        format: 'image/png'
      });

      if(itemName == ($scope.mapId + "group")) {
        removeAllMapLayers($scope.map);

        if(layerName == 'OSM') {
          $scope.map.addLayer($scope.OSMLayer);
          $scope.OSMLayer.bringToBack();
        }
        else {
          $scope.map.addLayer(layer);
          layer.bringToBack();
        }

        if($scope.showTownBorders) {
          $scope.addTownBorders();
        }

        //Create events for classification layers
        let classificationGroup = ['meshGroup', 'irisGroup', 'townGroup'];
        for(let group of classificationGroup) {
          if(groupId == group) {
            addMapEvents(layerName);

        //legend chart color
            let legendContent = {
              text: ['0-20%', '20-40%', '40-60%', '60-80%', '80-100%', 'Non disponible'],
              color: ['#1a9641', '#a6d96a', '#ffffbf', '#fdae61', '#d7191c', '#cccfd2'],
              title: 'Pourcentage d\'imperméabilisation'
            };
            
            $scope.addLegend(legendContent);

            $scope.map.setZoom(13);
            break;
          }
        }

        if(groupId == "landcoverGroup"){
          let legendContent = {
            text: ['Bâti', 'Vég. herbacée', 'Vég. arborée', 'Culture', 'Sol nu', 'Eau', 'Non disponible'],
            color: ['#964c4c', '#a3c05e', '#669168', '#be8a4e', '#ffffc3', '#5385bf', '#cccfd2'],
            title: 'Légende'
          };

          $scope.addLegend(legendContent);
        }
      }

      if(groupId == 'landsatGroup' || groupId == 'spotGroup') {
        $scope.map.setZoom(13);
      }

      $scope.syncMaps();
    };

    $scope.addTownBorders = function() {
      L.tileLayer.wms($scope.geoServerBaseUrl, {
        layers: 'towns_border-d2015',
        transparent: true,
        format: 'image/png'
      }).addTo($scope.map);
    };

    $scope.removeTownBorders = function() {
      $scope.map.eachLayer(function(layer) {
        if(layer.options.layers == 'towns_border-d2015') {
          $scope.map.removeLayer(layer);
        }
      });
    };

    $scope.downloadMap = function(){

      $scope.downloadStart = true;

      let downloadByTown = function(res){
        let townBbox = res.bbox;
        let townPolygon = res.features[0].geometry.coordinates[0];
        MapInfo.downloadMapInfo({
          townBbox,
          townPolygon,
          layerName: $scope.selectedLayer,
          townName: $scope.selectedTown
        })
          .then(res => {
            $scope.downloadStart = false;
          })
          .catch(err => {
            $scope.downloadErrorMessage = "Une erreur est survenue.";
            $scope.downloadStart = false;
          });
      };

      MapInfo.getTownInfo({
        townName: $scope.selectedTown
      })
        .then(res => {
          downloadByTown(res);
        })
        .catch(err => {
          $scope.downloadErrorMessage = "Une erreur est survenue.";
          $scope.downloadStart = false;
        });

    };
  }

  $onInit() {

  }

}


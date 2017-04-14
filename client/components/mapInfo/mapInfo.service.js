'use strict';

require('leaflet');

const proj4 = require("proj4");
//Define France projection
proj4.defs('EPSG:2154', "+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ");

export function MapInfoService($http, $q) {
  'ngInject';

  const geoServerBaseUrl = 'http://a.map.webarmature.fr/geoserver/wms/';

  let MapInfo = {

    getFeatureInfo({
      map,
      layerName,
      event
    }, callback)
    {
      let url = this.getFeatureInfoUrl(map, layerName, event.latlng);
      return $http.post('/api/mapInfo/pointInfo', {
        url
      })
        .then(res => {
          return res.data;
        });
    },

    getFeatureInfoUrl(map, layerName, latlng){
      let wmsParams = L.TileLayer.WMS.prototype.defaultWmsParams;

      // Construct a GetFeatureInfo request URL given a point
      let point = map.latLngToContainerPoint(latlng, map.getZoom());
      let size = map.getSize();

      let params = {
        request: 'GetFeatureInfo',
        service: 'WMS',
        srs: 'EPSG:4326',
        styles: wmsParams.styles,
        transparent: wmsParams.transparent,
        version: wmsParams.version,
        format: wmsParams.format,
        bbox: map.getBounds().toBBoxString(),
        height: size.y,
        width: size.x,
        layers: layerName,
        query_layers: layerName,
        info_format: 'application/json',
        propertyName: "percent_aa"
      };

      params[params.version === '1.3.0' ? 'i' : 'x'] = point.x;
      params[params.version === '1.3.0' ? 'j' : 'y'] = point.y;

      return geoServerBaseUrl + L.Util.getParamString(params, geoServerBaseUrl, true);
    },

    getCoordinateArrayString(mapBounds){
      let southWest = proj4('EPSG:2154', [mapBounds._southWest.lng, mapBounds._southWest.lat]);
      let northEast = proj4('EPSG:2154', [mapBounds._northEast.lng, mapBounds._northEast.lat]);

      let coordinateArray = [southWest[0], southWest[1], northEast[0], northEast[1]];
      let coordinateArrayString = "" + coordinateArray[0] + "," + coordinateArray[1] + "," + coordinateArray[2] + "," + coordinateArray[3];

      return coordinateArrayString;
    },

    getMapInfo({
      map,
      layerName
    }, callback)
    {
      let url = this.getMapInfoUrl(map, layerName);
      return $http.post('/api/mapInfo', {
        url
      })
        .then(res => {
          return res.data;
        });
    },

    getMapInfoUrl(map, layerName){
      let mapBounds = map.getBounds();

      let coordinateArrayString = this.getCoordinateArrayString(mapBounds);

      // Construct a GetFeature request URL given a box
      var params = {
        request: 'GetFeature',
        service: 'WFS',
        srs: 'EPSG:2154',
        version: "2.0.0",
        bbox: coordinateArrayString,
        typeNames: layerName,
        outputFormat: 'application/json',
        propertyName: "percent_aa,Shape_Area"
      };

      return geoServerBaseUrl + L.Util.getParamString(params, geoServerBaseUrl, true);
    },

    getGeoserverBaseUrl(){
      return geoServerBaseUrl;
    }


  };

  return MapInfo;
}


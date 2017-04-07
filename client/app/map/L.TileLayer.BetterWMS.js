require("leaflet");
const proj4 = require("proj4");

L.TileLayer.BetterWMS = L.TileLayer.WMS.extend({

  onAdd: function (map) {
    // Triggered when the layer is added to a map.
    //   Register a click listener, then do all the upstream WMS things
    L.TileLayer.WMS.prototype.onAdd.call(this, map);
    map.on('click', this.getFeatureInfo, this);
    map.on('moveend', this.getMapInfo, this);
  },

  onRemove: function (map) {
    // Triggered when the layer is removed from a map.
    //   Unregister a click listener, then do all the upstream WMS things
    L.TileLayer.WMS.prototype.onRemove.call(this, map);
    map.off('click', this.getFeatureInfo, this);
    map.off('moveend', this.getMapInfo, this);
  },

  getMapInfo: function(){
    let url = this.getMapInfoUrl();

    var getMapInfo = function(){
      $.ajax({
        url: "/api/mapInfo",
        data: {
          url: url
        },
        success: function (data) {
          console.log(data);
        }
      });
    };

    getMapInfo();
  },

  getMapInfoUrl(){
    let mapBounds = this._map.getBounds();

    proj4.defs('EPSG:2154', "+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ");
    let southWest = proj4('EPSG:2154', [mapBounds._southWest.lng, mapBounds._southWest.lat]);
    let northEast = proj4('EPSG:2154', [mapBounds._northEast.lng, mapBounds._northEast.lat]);

    let coordinateArray = [southWest[0], southWest[1], northEast[0], northEast[1]];
    let coordinateArrayString = ""+coordinateArray[0]+","+coordinateArray[1]+","+coordinateArray[2]+","+coordinateArray[3];

    // Construct a GetFeature request URL given a box
    var params = {
        request: 'GetFeature',
        service: 'WFS',
        srs: 'EPSG:2154',
        version: "2.0.0",
        bbox: coordinateArrayString,
        typeNames: "test:" + this.wmsParams.layers,
        outputFormat: 'application/json'
      };

    return this._url + L.Util.getParamString(params, this._url, true);
  },

  getFeatureInfo: function (evt) {
    // Make an AJAX request to the server and hope for the best
    let url = this.getFeatureInfoUrl(evt.latlng);
    let showResults = L.Util.bind(this.showGetFeatureInfo, this);

    var getPointInfo = function(){
      $.ajax({
        url: "/api/mapInfo/pointInfo",
        data: {
          url: url
        },
        success: function (data) {
          var err = typeof data.body === 'string' ? null : data.body;
          showResults(err, evt.latlng, data.body);
        }
      });
    };

    //If not clicking inside the sidebar getMapInfo
    if (!$(evt.originalEvent.srcElement).closest("sidebar").length) {
      getPointInfo();
    }

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
        info_format: 'application/json'
      };

    params[params.version === '1.3.0' ? 'i' : 'x'] = point.x;
    params[params.version === '1.3.0' ? 'j' : 'y'] = point.y;

    return this._url + L.Util.getParamString(params, this._url, true);
  },

  showGetFeatureInfo: function (err, latlng, data) {
    if (err) { console.log(err); return; }

    var oldContent = $(".leaflet-popup-content").html();

    var popup = L.popup({ maxWidth: 800})
      .setLatLng(latlng)
      .openOn(this._map)
      .setContent(oldContent);

    this.createNewContent(data);

  },

  createNewContent: function(newData){

    let popupMapId = this.getMapId();

    let dataToAdd = this.getDataToAdd(newData);

    let dataToAddId = Object.keys(dataToAdd)[0];
    let dataToAddItem = dataToAdd[dataToAddId];

    let popupNodeExists = this.popupNodeExists(popupMapId, dataToAddId);

    if(!popupNodeExists){
      this.createPopupNode(popupMapId, dataToAddId);
    }
    this.insertData(popupMapId, dataToAddItem, dataToAddId);

  },

  getMapId: function () {
    return this._map._container.id;
  },

  getDataToAdd: function (data) {

    let dataJson = JSON.parse(data);
    let dataProperties = dataJson.features[0].properties;

    if(dataProperties.hasOwnProperty('NOM_COM')){
      return {"Commune" : dataProperties.NOM_COM};
    }
    else{
      let percent = +dataProperties.percent_a.toFixed(2);
      return {"Imperméable": percent.toString()};
    }

  },

  popupNodeExists: function(popupMapId, nodeToCheck){
    return $("#"+popupMapId).find(".leaflet-popup-content").children("#" + nodeToCheck).length > 0;
  },

  createPopupNode: function(popupMapId, nodeToCreate){
    $("#"+popupMapId).find(".leaflet-popup-content").append("<div id='"+nodeToCreate+"'>"+nodeToCreate+": <div class='data'></div></div>");
  },

  insertData: function(popupMapId, data, dataId){
    $("#"+popupMapId).find(".leaflet-popup-content").children("#" + dataId).children(".data").text(data);
  }

});

L.tileLayer.betterWms = function (url, options) {
  return new L.TileLayer.BetterWMS(url, options);
};

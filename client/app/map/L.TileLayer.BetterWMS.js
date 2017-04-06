require("leaflet");

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
    let url = this.getFeatureInfoUrl(evt.latlng);
    let showResults = L.Util.bind(this.showGetFeatureInfo, this);

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

    //If not clicking inside the sidebar getMapInfo
    if (!$(evt.originalEvent.srcElement).closest("sidebar").length) {
      getMapInfo();
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

  showGetFeatureInfo: function (err, latlng, content) {
    if (err) { console.log(err); return; }

    var contentToShow = this.extractContent(content);

    //let popupContent = $(".leaflet-popup-content").html();

    var popup = L.popup({ maxWidth: 800})
      .setLatLng(latlng)
      .setContent(contentToShow)
      .openOn(this._map);

    //$(".leaflet-popup-content").append(popupContent);
  },

  extractContent: function(content){
    let contentJson = JSON.parse(content);
    let actualInfo = contentJson.features[0].properties;

    if(actualInfo.hasOwnProperty('NOM_COM')){
      return "Commune: " + actualInfo.NOM_COM + "\n";
    }
    else{
      let percent = +actualInfo.percent_a.toFixed(2);
      return "% d'imperméable: " + percent.toString() + "\n";
    }
  }

});

L.tileLayer.betterWms = function (url, options) {
  return new L.TileLayer.BetterWMS(url, options);
};

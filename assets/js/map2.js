var center = [45.7604276, 4.8335709];

var map1 = L.map('map1', {
    center: center,
    zoom: 16,
    maxZoom: 18,
    minZoom: 13
});

var map2 = L.map('map2', {
    center: center,
    zoom: 16,
    maxZoom: 18,
    minZoom: 13
});

map1.zoomControl.setPosition('topright');
map2.zoomControl.setPosition('topright');

map1.sync(map2, {syncCursor: true});
map2.sync(map1, {syncCursor: true});

var LOSM = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }
).addTo(map1);

var ROSM = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }
).addTo(map2);

$("input[type=radio]").on('switchChange.bootstrapSwitch', function (e, s) {

    var layerName = this.id;
    var layer = L.tileLayer.wms('http://a.map.webarmature.fr/geoserver/wms/', {
        layers: layerName,
        transparent: true
    });

    if (this.checked && this.name == "GroupedSwitchesL") {
        removeAllMap1Layers();
        if (layerName != "LOSM") {
            map1.addLayer(layer);
        }
        else {
            L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                }
            ).addTo(map1);
        }
    }
    else if(this.checked && this.name == "GroupedSwitchesR"){
        removeAllMap2Layers();
        if (layerName != "ROSM") {
            map2.addLayer(layer);
        }
        else {
            L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                }
            ).addTo(map2);
        }
    }
});

$(".bs").bootstrapSwitch('state', false);

function removeAllMap1Layers() {
    map1.eachLayer(function (layer) {
        map1.removeLayer(layer);
    });
}

function removeAllMap2Layers() {
    map2.eachLayer(function (layer) {
        map2.removeLayer(layer);
    });
}

L.popup();

//Define the center of the map
var center = [45.7604276, 4.8335709];

//Create left map
var map1 = L.map('map1', {
    center: center,
    zoom: 16,
    maxZoom: 18,
    minZoom: 13
});

//Create right map
var map2 = L.map('map2', {
    center: center,
    zoom: 16,
    maxZoom: 18,
    minZoom: 13
});

//SetZoomePosition
map1.zoomControl.setPosition('topright');
map2.zoomControl.setPosition('topright');

//Sync zoom of the 2 maps
map1.sync(map2, {syncCursor: true});
map2.sync(map1, {syncCursor: true});

//Set default map
var LOSM = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }
).addTo(map1);

//Set default map
var ROSM = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }
).addTo(map2);

//Upon change of map selection
$("input[type=radio]").on('switchChange.bootstrapSwitch', function (e, s) {

    //Create the new layer
    var layerName = this.value;
    var layer = L.tileLayer.wms('http://a.map.webarmature.fr/geoserver/wms/', {
        layers: layerName,
        transparent: true
    });

    //If checking left group
    if (this.checked && this.name == "GroupedSwitchesL") {
        removeAllMap1Layers();
        //Every map has the same structure except the default one. Make sure you don't have the default one selected
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
    //If checking right group
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

//Collapse and put inactive the selected element of the other sidebar on click
$("#sidebar_right").click(function(){
   $("#sidebar_left").addClass("collapsed");
   $("#sidebar_left-elements").find("li").each(function(){
        $(this).removeClass("active");
   });
});

$("#sidebar_left").click(function(){
    $("#sidebar_right").addClass("collapsed");
    $("#sidebar_right-elements").find("li").each(function(){
        $(this).removeClass("active");
    });
});

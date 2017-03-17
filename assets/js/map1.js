var defaultMapConfig = {
    center: [45.7604276, 4.8335709],
    zoom: 16,
    maxZoom: 18,
    minZoom: 13
};

var map1 = L.map('map1', defaultMapConfig);

var OSM = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }
);

map1.addLayer(OSM);

map1.zoomControl.setPosition('topright');

var sidebar = L.control.sidebar('sidebar').addTo(map1);

$("input[type=radio]").on('switchChange.bootstrapSwitch', function (e, s) {

    if(this.checked){
        removeAllLayers(map1);
        var layerName = this.value;
        var attribution = this.alt;
        if(layerName != "LOSM"){
            var layer = L.tileLayer.wms('http://a.map.webarmature.fr/geoserver/wms/', {
                layers: layerName,
                transparent: true,
                attribution: attribution
            });
            map1.addLayer(layer);
        }
        else{
            map1.addLayer(OSM);
        }

        var groupId = $(this).closest("div[id]").attr("id");

        if(groupId == "landsatGroup" || groupId == "spotGroup"){
            map1.setZoom(13);
        }
        else{
            map1.setZoom(16);
        }
    }
});

$(".bs").bootstrapSwitch('state', false);

function removeAllLayers(map) {
    map.eachLayer(function(layer) {
        map.removeLayer(layer);
    });
}

//Add class to sidebar buttons when clicking them. Remove it from the other buttons since they will collapse
$(".sidebarButton").click(function(){
    if(!($(this).hasClass("selected"))){
        $(".sidebarButton").each(function(){
            $(this).removeClass("selected");
        });
        $(this).addClass("selected");
    }
    else{
        $(this).removeClass("selected");
    }
});

//When clicking inside of map if the sidebar is not collapsed, collapsed it and deactivate its selected elements
$("#map1").click(function(event) {
    if(!$(event.target).closest('#sidebar').length) {
        if(!($("#sidebar").hasClass("collapsed"))) {
            $('#sidebar').addClass("collapsed");
            $('#sidebar').find("li").each(function(){
                $(this).removeClass("active");
            });
        }
    }
});
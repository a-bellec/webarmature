           // Basemap Layers
		//raster data map 1
		var map1ESRI = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png', {
			attribution: '&copy; <a href="http://www.esri.com/">Esri</a>, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, \and the GIS User Community'});

	
			// Map screen 1
				// Mettre "zoomControl: false" si on veux changer de place au cursor de zoom
		var map1 = L.map("map1", {
			zoom: 9,
			center: [45.8913, 5.0343],
			layers: [map1ESRI],
			zoomControl: true,
		});


	// set GeoJSON icon (unselect)
    var presence = L.icon({
      iconUrl: 'media/logo/thierry_presence_icon.png',
      iconSize: [30,30]
    });
	// set GeoJSON icon (unselect)
    var absence = L.icon({
      iconUrl: 'media/logo/thierry_absence_icon.png',
      iconSize: [30,30]
    });
	
		// load GeoJSON from an external file
   $.getJSON("resources/data/data_thierry_presence.geojson",function(data){

    var data_presence = L.geoJson(data,{
      pointToLayer: function(feature,latlng){
        var marker = L.marker(latlng,{icon: presence});
// For popup in map :
	//        marker.bindPopup 
	//		('<strong>Commune : </strong>' + feature.properties.MUNICIPALITY + '<br/>' + '<strong>aph_sub : </strong>' + 	feature.properties.aph_sub + '<br/>' + '<strong>Lat. : </strong>' + feature.properties.POINT_Y + '<br/>' + '<strong>Long. : </strong>' + feature.properties.POINT_X);
        return marker;
      },
    onEachFeature: function (feature, layer) {
        //layer.bindPopup(feature.properties.GPSUserName);

        layer.on('click', function (e) {
            document.getElementById("info").innerHTML = (
			'<strong>Commune : </strong>' + feature.properties.MUNICIPALI + '<br/>' + 
			'<strong>Long. : </strong>' + feature.properties.COORD_LON_ + '<br/>' + 
			'<strong>Lat. : </strong>' + feature.properties.COORD_LAT_ + '<br/>' +
			'<strong>Elev. : </strong>' + feature.properties.ALTITUDE+ ' meters' +'<br/>' +
			'<hr>');
            $("#sidebar2").stop();
            $("#sidebar2").fadeIn("fast");

            console.log(feature.properties.name);
            $("#sidebar2").fadeOut(5000);
        });
    }
    });
    var clusters = L.markerClusterGroup();
    clusters.addLayer(data_presence);
    map1.addLayer(clusters);
  });

  
		// load GeoJSON from an external file
   $.getJSON("resources/data/data_thierry_absence.geojson",function(data){

    var data_absence = L.geoJson(data,{
      pointToLayer: function(feature,latlng){
        var marker = L.marker(latlng,{icon: absence});
// For popup in map :
	//        marker.bindPopup 
	//		('<strong>Commune : </strong>' + feature.properties.MUNICIPALITY + '<br/>' + '<strong>aph_sub : </strong>' + 	feature.properties.aph_sub + '<br/>' + '<strong>Lat. : </strong>' + feature.properties.POINT_Y + '<br/>' + '<strong>Long. : </strong>' + feature.properties.POINT_X);
        return marker;
      },
    onEachFeature: function (feature, layer) {
        //layer.bindPopup(feature.properties.GPSUserName);

        layer.on('click', function (e) {
            document.getElementById("info").innerHTML = (
			'<strong>Commune : </strong>' + feature.properties.MUNICIPALI + '<br/>' + 
			'<strong>Long. : </strong>' + feature.properties.COORD_LON_ + '<br/>' + 
			'<strong>Lat. : </strong>' + feature.properties.COORD_LAT_ + '<br/>' +
			'<strong>Elev. : </strong>' + feature.properties.ALTITUDE+ ' meters' +'<br/>' +
			'<hr>');
            $("#sidebar2").stop();
            $("#sidebar2").fadeIn("fast");

            console.log(feature.properties.name);
            $("#sidebar2").fadeOut(5000);
        });
    }
    });
    var clusters = L.markerClusterGroup();
    clusters.addLayer(data_absence);
    map1.addLayer(clusters);
  });  
  
  
  
  
  
  
  
	//Gestion des flux pour les maps - vue 1
		var baseMap_map1 = {
			"ESRI Map":map1ESRI};

L.control.mousePosition().addTo(map1);
document.getElementById('controls').appendChild(controlDiv);














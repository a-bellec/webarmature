var center = [45.7604276, 4.8335709];

var map1 = L.map('map1', {
	center: center,
	zoom: 16,
	maxZoom: 18,
	minZoom: 13,
});

var LOSM = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}
).addTo(map1);

var L1954 = L.tileLayer.wms('http://a.map.webarmature.fr/geoserver/wms/', {
	layers: 'data_all_1954',
	transparent: true,
	attribution: 'Ann&#233;e : 1954 - &copy; <a href="http://www.geoportail.gouv.fr/">IGN - Photos a&#233;riennes 1954</a>'});
	
var L1966 = L.tileLayer.wms('http://a.map.webarmature.fr/geoserver/wms/', {
	layers: 'data_all_1966',
	transparent: true,
	attribution: 'Ann&#233;e : 1966 - &copy; <a href="http://www.geoportail.gouv.fr/">IGN - Photos a&#233;riennes 1966</a>'});
	
var L1978 = L.tileLayer.wms('http://a.map.webarmature.fr/geoserver/wms/', {
	layers: 'data_all_1978',
	transparent: true,
	attribution: 'Ann&#233;e : 1978 - &copy; <a href="http://www.geoportail.gouv.fr/">IGN - Photos a&#233;riennes 1978</a>'});
	
var L1986 = L.tileLayer.wms('http://a.map.webarmature.fr/geoserver/wms/', {
	layers: 'data_all_1986',
	transparent: true,
	attribution: 'Ann&#233;e : 1986 - &copy; <a href="http://www.geoportail.gouv.fr/">IGN - Photos a&#233;riennes 1986</a>'});
	
var L1993 = L.tileLayer.wms('http://a.map.webarmature.fr/geoserver/wms/', {
	layers: 'data_all_1993',
	transparent: true,
	attribution: 'Ann&#233;e : 1993 - &copy; <a href="http://www.grandlyon.com/"> Grand Lyon orthophotographie 1993</a>'});
	
var L1997 = L.tileLayer.wms('http://a.map.webarmature.fr/geoserver/wms/', {
	layers: 'data_all_1997',
	transparent: true,
	attribution: 'Ann&#233;e : 1997 - &copy; <a href="http://www.grandlyon.com/"> Grand Lyon orthophotographie 1997</a>'});
	
var L2003 = L.tileLayer.wms('http://a.map.webarmature.fr/geoserver/wms/', {
	layers: 'data_all_2003',
	transparent: true,
	attribution: 'Ann&#233;e : 2003 - &copy; <a href="http://www.grandlyon.com/"> Grand Lyon orthophotographie 2003</a>'});
	
var L2007 = L.tileLayer.wms('http://a.map.webarmature.fr/geoserver/wms/', {
	layers: 'data_all_2007',
	transparent: true,
	attribution: 'Ann&#233;e : 2007 - &copy; <a href="http://www.geoportail.gouv.fr/"> Photos a&#233;riennes 2007</a>'});

var Lscan25_50 = L.tileLayer.wms('http://a.map.webarmature.fr/geoserver/wms/', {
	layers: 'scan25_all_1950',
	transparent: true,
	attribution: 'Ann&#233;e : 1950 - &copy; <a href="http://ign.fr/"> Scan 25 1950</a>'});

var Lscan25_60 = L.tileLayer.wms('http://a.map.webarmature.fr/geoserver/wms/', {
	layers: 'scan25_all_1960',
	transparent: true,
	attribution: 'Ann&#233;e : 1960 - &copy; <a href="http://ign.fr/"> Scan 25 1960</a>'});

var Lscan25_70 = L.tileLayer.wms('http://a.map.webarmature.fr/geoserver/wms/', {
	layers: 'scan25_all_1970',
	transparent: true,
	attribution: 'Ann&#233;e : 1970 - &copy; <a href="http://ign.fr/"> Scan 25 1970</a>'});

var Lscan25_85 = L.tileLayer.wms('http://a.map.webarmature.fr/geoserver/wms/', {
	layers: 'scan25_all_1985',
	transparent: true,
	attribution: 'Ann&#233;e : 1985 - &copy; <a href="http://ign.fr/"> Scan 25 1985</a>'});

var Lscan25_98 = L.tileLayer.wms('http://a.map.webarmature.fr/geoserver/wms/', {
	layers: 'scan25_lyon_1998',
	transparent: true,
	attribution: 'Ann&#233;e : 1998 - &copy; <a href="http://ign.fr/"> Scan 25 1998</a>'});

var Lscan25_03 = L.tileLayer.wms('http://a.map.webarmature.fr/geoserver/wms/', {
	layers: 'scan25_all_2003',
	transparent: true,
	attribution: 'Ann&#233;e : 2003 - &copy; <a href="http://ign.fr/"> Scan 25 2003</a>'});
	
var Lscan25_15 = L.tileLayer.wms('http://a.map.webarmature.fr/geoserver/wms/', {
	layers: 'scan25_all_2015',
	transparent: true,
	attribution: 'Ann&#233;e : 2015 - &copy; <a href="http://ign.fr/"> Scan 25 2015</a>'});
	
var Lscan50_50 = L.tileLayer.wms('http://a.map.webarmature.fr/geoserver/wms/', {
	layers: 'scan50_all_1950',
	transparent: true,
	attribution: 'Ann&#233;e : 1950 - &copy; <a href="http://ign.fr/"> Scan 50 1950</a>'});

var popup = L.popup();

map1.zoomControl.setPosition('topleft');

$("[id='LOSM']").bootstrapSwitch('state',true);

$("[id='LOSM']").on('switchChange.bootstrapSwitch',function(e,s){
  	if (s == true){ 
	  map1.addLayer(LOSM);
      map1.removeLayer(L1954);
      map1.removeLayer(L1966);
      map1.removeLayer(L1978);
      map1.removeLayer(L1986);
      map1.removeLayer(L1993);
      map1.removeLayer(L1997);
      map1.removeLayer(L2003);
      map1.removeLayer(L2007);
      map1.removeLayer(Lscan25_50);
      map1.removeLayer(Lscan25_60);
      map1.removeLayer(Lscan25_70);
      map1.removeLayer(Lscan25_85);
      map1.removeLayer(Lscan25_98);
      map1.removeLayer(Lscan25_03);
	  map1.removeLayer(Lscan25_15);
	  map1.removeLayer(Lscan50_50);		  
   }
 });
 
$("[id='L1954']").on('switchChange.bootstrapSwitch',function(e,s){
  	if (s == true){ 
	  map1.removeLayer(LOSM);
      map1.addLayer(L1954);
      map1.removeLayer(L1966);
      map1.removeLayer(L1978);
      map1.removeLayer(L1986);
      map1.removeLayer(L1993);
      map1.removeLayer(L1997);
      map1.removeLayer(L2003);
      map1.removeLayer(L2007);
      map1.removeLayer(Lscan25_50);
      map1.removeLayer(Lscan25_60);
      map1.removeLayer(Lscan25_70);
      map1.removeLayer(Lscan25_85);
      map1.removeLayer(Lscan25_98);
      map1.removeLayer(Lscan25_03);
	  map1.removeLayer(Lscan25_15);
	  map1.removeLayer(Lscan50_50);		  
   }
 });

$("[id='L1966']").on('switchChange.bootstrapSwitch',function(e,s){
  	if (s == true){ 
	  map1.removeLayer(LOSM);
      map1.removeLayer(L1954);
      map1.addLayer(L1966);
      map1.removeLayer(L1978);
      map1.removeLayer(L1986);
      map1.removeLayer(L1993);
      map1.removeLayer(L1997);
      map1.removeLayer(L2003);
      map1.removeLayer(L2007);
      map1.removeLayer(Lscan25_50);
      map1.removeLayer(Lscan25_60);
      map1.removeLayer(Lscan25_70);
      map1.removeLayer(Lscan25_85);
      map1.removeLayer(Lscan25_98);
      map1.removeLayer(Lscan25_03);
	  map1.removeLayer(Lscan25_15);
	  map1.removeLayer(Lscan50_50);		  
   }
 });
 
$("[id='L1978']").on('switchChange.bootstrapSwitch',function(e,s){
  	if (s == true){ 
	  map1.removeLayer(LOSM);
      map1.removeLayer(L1954);
      map1.removeLayer(L1966);
      map1.addLayer(L1978);
      map1.removeLayer(L1986);
      map1.removeLayer(L1993);
      map1.removeLayer(L1997);
      map1.removeLayer(L2003);
      map1.removeLayer(L2007);
      map1.removeLayer(Lscan25_50);
      map1.removeLayer(Lscan25_60);
      map1.removeLayer(Lscan25_70);
      map1.removeLayer(Lscan25_85);
      map1.removeLayer(Lscan25_98);
      map1.removeLayer(Lscan25_03);
	  map1.removeLayer(Lscan25_15);	  	  
	  map1.removeLayer(Lscan50_50);		  
   }
 });

$("[id='L1986']").on('switchChange.bootstrapSwitch',function(e,s){
  	if (s == true){ 
	  map1.removeLayer(LOSM);
      map1.removeLayer(L1954);
      map1.removeLayer(L1966);
      map1.removeLayer(L1978);
      map1.addLayer(L1986);
      map1.removeLayer(L1993);
      map1.removeLayer(L1997);
      map1.removeLayer(L2003);
      map1.removeLayer(L2007);
      map1.removeLayer(Lscan25_50);
      map1.removeLayer(Lscan25_60);
      map1.removeLayer(Lscan25_70);
      map1.removeLayer(Lscan25_85);
      map1.removeLayer(Lscan25_98);
      map1.removeLayer(Lscan25_03);
	  map1.removeLayer(Lscan25_15);	  	  
	  map1.removeLayer(Lscan50_50);		  
   }
 });

$("[id='L1993']").on('switchChange.bootstrapSwitch',function(e,s){
  	if (s == true){ 
	  map1.removeLayer(LOSM);
      map1.removeLayer(L1954);
      map1.removeLayer(L1966);
      map1.removeLayer(L1978);
      map1.removeLayer(L1986);
      map1.addLayer(L1993);
      map1.removeLayer(L1997);
      map1.removeLayer(L2003);
      map1.removeLayer(L2007);
      map1.removeLayer(Lscan25_50);
      map1.removeLayer(Lscan25_60);
      map1.removeLayer(Lscan25_70);
      map1.removeLayer(Lscan25_85);
      map1.removeLayer(Lscan25_98);
      map1.removeLayer(Lscan25_03);
	  map1.removeLayer(Lscan25_15);	  	  
 	  map1.removeLayer(Lscan50_50);		  
  }
 });
 
 $("[id='L1997']").on('switchChange.bootstrapSwitch',function(e,s){
  	if (s == true){ 
	  map1.removeLayer(LOSM);
      map1.removeLayer(L1954);
      map1.removeLayer(L1966);
      map1.removeLayer(L1978);
      map1.removeLayer(L1986);
      map1.removeLayer(L1993);
      map1.addLayer(L1997);
      map1.removeLayer(L2003);
      map1.removeLayer(L2007);
      map1.removeLayer(Lscan25_50);
      map1.removeLayer(Lscan25_60);
      map1.removeLayer(Lscan25_70);
      map1.removeLayer(Lscan25_85);
      map1.removeLayer(Lscan25_98);
      map1.removeLayer(Lscan25_03);
	  map1.removeLayer(Lscan25_15);	  	  
	  map1.removeLayer(Lscan50_50);		  
   }
 });
 
  $("[id='L2003']").on('switchChange.bootstrapSwitch',function(e,s){
  	if (s == true){ 
	  map1.removeLayer(LOSM);
      map1.removeLayer(L1954);
      map1.removeLayer(L1966);
      map1.removeLayer(L1978);
      map1.removeLayer(L1986);
      map1.removeLayer(L1993);
      map1.removeLayer(L1997);
      map1.addLayer(L2003);
      map1.removeLayer(L2007);
      map1.removeLayer(Lscan25_50);
      map1.removeLayer(Lscan25_60);
      map1.removeLayer(Lscan25_70);
      map1.removeLayer(Lscan25_85);
      map1.removeLayer(Lscan25_98);
      map1.removeLayer(Lscan25_03);
	  map1.removeLayer(Lscan25_15);	  	  
	  map1.removeLayer(Lscan50_50);		  
   }
 });
  
   $("[id='L2007']").on('switchChange.bootstrapSwitch',function(e,s){
  	if (s == true){ 
	  map1.removeLayer(LOSM);
      map1.removeLayer(L1954);
      map1.removeLayer(L1966);
      map1.removeLayer(L1978);
      map1.removeLayer(L1986);
      map1.removeLayer(L1993);
      map1.removeLayer(L1997);
      map1.removeLayer(L2003);
      map1.addLayer(L2007);
      map1.removeLayer(Lscan25_50);
      map1.removeLayer(Lscan25_60);
      map1.removeLayer(Lscan25_70);
      map1.removeLayer(Lscan25_85);
      map1.removeLayer(Lscan25_98);
      map1.removeLayer(Lscan25_03);
	  map1.removeLayer(Lscan25_15);	  	  
 	  map1.removeLayer(Lscan50_50);		  
  }
 });
 
    $("[id='Lscan25_50']").on('switchChange.bootstrapSwitch',function(e,s){
  	if (s == true){ 
	  map1.removeLayer(LOSM);
      map1.removeLayer(L1954);
      map1.removeLayer(L1966);
      map1.removeLayer(L1978);
      map1.removeLayer(L1986);
      map1.removeLayer(L1993);
      map1.removeLayer(L1997);
      map1.removeLayer(L2003);
      map1.removeLayer(L2007);
      map1.addLayer(Lscan25_50);
      map1.removeLayer(Lscan25_60);
      map1.removeLayer(Lscan25_70);
      map1.removeLayer(Lscan25_85);
      map1.removeLayer(Lscan25_98);
      map1.removeLayer(Lscan25_03);
	  map1.removeLayer(Lscan25_15);	  	  
	  map1.removeLayer(Lscan50_50);		  
   }
 });
 
     $("[id='Lscan25_60']").on('switchChange.bootstrapSwitch',function(e,s){
  	if (s == true){ 
	  map1.removeLayer(LOSM);
      map1.removeLayer(L1954);
      map1.removeLayer(L1966);
      map1.removeLayer(L1978);
      map1.removeLayer(L1986);
      map1.removeLayer(L1993);
      map1.removeLayer(L1997);
      map1.removeLayer(L2003);
      map1.removeLayer(L2007);
      map1.removeLayer(Lscan25_50);
      map1.addLayer(Lscan25_60);
      map1.removeLayer(Lscan25_70);
      map1.removeLayer(Lscan25_85);
      map1.removeLayer(Lscan25_98);
      map1.removeLayer(Lscan25_03);
	  map1.removeLayer(Lscan25_15);	  
	  map1.removeLayer(Lscan50_50);		  
   }
 }); 
 
     $("[id='Lscan25_70']").on('switchChange.bootstrapSwitch',function(e,s){
  	if (s == true){ 
	  map1.removeLayer(LOSM);
      map1.removeLayer(L1954);
      map1.removeLayer(L1966);
      map1.removeLayer(L1978);
      map1.removeLayer(L1986);
      map1.removeLayer(L1993);
      map1.removeLayer(L1997);
      map1.removeLayer(L2003);
      map1.removeLayer(L2007);
      map1.removeLayer(Lscan25_50);
      map1.removeLayer(Lscan25_60);
      map1.addLayer(Lscan25_70);
      map1.removeLayer(Lscan25_85);
      map1.removeLayer(Lscan25_98);
      map1.removeLayer(Lscan25_03);
	  map1.removeLayer(Lscan25_15);	  
	  map1.removeLayer(Lscan50_50);		  
   }
 });
 
      $("[id='Lscan25_85']").on('switchChange.bootstrapSwitch',function(e,s){
  	if (s == true){ 
	  map1.removeLayer(LOSM);
      map1.removeLayer(L1954);
      map1.removeLayer(L1966);
      map1.removeLayer(L1978);
      map1.removeLayer(L1986);
      map1.removeLayer(L1993);
      map1.removeLayer(L1997);
      map1.removeLayer(L2003);
      map1.removeLayer(L2007);
      map1.removeLayer(Lscan25_50);
      map1.removeLayer(Lscan25_60);
      map1.removeLayer(Lscan25_70);
      map1.addLayer(Lscan25_85);
      map1.removeLayer(Lscan25_98);
      map1.removeLayer(Lscan25_03);
	  map1.removeLayer(Lscan25_15);	  	  
	  map1.removeLayer(Lscan50_50);		  
   }
 });
 
$("[id='Lscan25_98']").on('switchChange.bootstrapSwitch',function(e,s){
  	if (s == true){ 
	  map1.removeLayer(LOSM);
      map1.removeLayer(L1954);
      map1.removeLayer(L1966);
      map1.removeLayer(L1978);
      map1.removeLayer(L1986);
      map1.removeLayer(L1993);
      map1.removeLayer(L1997);
      map1.removeLayer(L2003);
      map1.removeLayer(L2007);
      map1.removeLayer(Lscan25_50);
      map1.removeLayer(Lscan25_60);
      map1.removeLayer(Lscan25_70);
      map1.removeLayer(Lscan25_85);
      map1.addLayer(Lscan25_98);
      map1.removeLayer(Lscan25_03);
	  map1.removeLayer(Lscan25_15);	  	  
	  map1.removeLayer(Lscan50_50);		  
   }
 });
 
$("[id='Lscan25_03']").on('switchChange.bootstrapSwitch',function(e,s){
  	if (s == true){ 
	  map1.removeLayer(LOSM);
      map1.removeLayer(L1954);
      map1.removeLayer(L1966);
      map1.removeLayer(L1978);
      map1.removeLayer(L1986);
      map1.removeLayer(L1993);
      map1.removeLayer(L1997);
      map1.removeLayer(L2003);
      map1.removeLayer(L2007);
      map1.removeLayer(Lscan25_50);
      map1.removeLayer(Lscan25_60);
      map1.removeLayer(Lscan25_70);
      map1.removeLayer(Lscan25_85);
      map1.removeLayer(Lscan25_98);
      map1.addLayer(Lscan25_03);
	  map1.removeLayer(Lscan25_15);	  
	  map1.removeLayer(Lscan50_50);		  
   }
 });
 
 $("[id='Lscan25_15']").on('switchChange.bootstrapSwitch',function(e,s){
  	if (s == true){ 
	  map1.removeLayer(LOSM);
      map1.removeLayer(L1954);
      map1.removeLayer(L1966);
      map1.removeLayer(L1978);
      map1.removeLayer(L1986);
      map1.removeLayer(L1993);
      map1.removeLayer(L1997);
      map1.removeLayer(L2003);
      map1.removeLayer(L2007);
      map1.removeLayer(Lscan25_50);
      map1.removeLayer(Lscan25_60);
      map1.removeLayer(Lscan25_70);
      map1.removeLayer(Lscan25_85);
      map1.removeLayer(Lscan25_98);
      map1.removeLayer(Lscan25_03);
	  map1.addLayer(Lscan25_15);
	  map1.removeLayer(Lscan50_50);		  
   }
 });
 
  $("[id='Lscan50_50']").on('switchChange.bootstrapSwitch',function(e,s){
  	if (s == true){ 
	  map1.removeLayer(LOSM);
      map1.removeLayer(L1954);
      map1.removeLayer(L1966);
      map1.removeLayer(L1978);
      map1.removeLayer(L1986);
      map1.removeLayer(L1993);
      map1.removeLayer(L1997);
      map1.removeLayer(L2003);
      map1.removeLayer(L2007);
      map1.removeLayer(Lscan25_50);
      map1.removeLayer(Lscan25_60);
      map1.removeLayer(Lscan25_70);
      map1.removeLayer(Lscan25_85);
      map1.removeLayer(Lscan25_98);
      map1.removeLayer(Lscan25_03);
	  map1.removeLayer(Lscan25_15);
	  map1.addLayer(Lscan50_50);		  
   }
 });
  
$(".bs").bootstrapSwitch('state', false);

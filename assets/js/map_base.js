// map1 
var map1 = L.map('map1', {
  maxZoom: 18,
  minZoom: 13,
zoomControl: true
}).setView([45.7604276, 4.8335709], 16);

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
	attribution: 'Ann&#233;e : 2007 - &copy; <a href="http://www.grandlyon.com/"> Grand Lyon orthophotographie 2007</a>'});	
	
var L2009 = L.tileLayer.wms('http://a.map.webarmature.fr/geoserver/wms/', {
	layers: 'data_all_2009',
	transparent: true,
	attribution: 'Ann&#233;e : 2009 - &copy; <a href="http://www.grandlyon.com/"> Grand Lyon orthophotographie 2009</a>'});

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
	
var Lscan50_60 = L.tileLayer.wms('http://a.map.webarmature.fr/geoserver/wms/', {
	layers: 'scan50_all_1960_clip',
	transparent: true,
	attribution: 'Ann&#233;e : 1960 - &copy; <a href="http://ign.fr/"> Scan 50 1960</a>'});	
	
var Lscan50_70 = L.tileLayer.wms('http://a.map.webarmature.fr/geoserver/wms/', {
	layers: 'scan50_all_1970_clip',
	transparent: true,
	attribution: 'Ann&#233;e : 1970 - &copy; <a href="http://ign.fr/"> Scan 50 1970</a>'});	
	
var Lscan50_80 = L.tileLayer.wms('http://a.map.webarmature.fr/geoserver/wms/', {
	layers: 'scan50_all_1980_clip',
	transparent: true,
	attribution: 'Ann&#233;e : 1980 - &copy; <a href="http://ign.fr/"> Scan 50 1980</a>'});

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
      map1.removeLayer(L2009);
      map1.removeLayer(Lscan25_50);
      map1.removeLayer(Lscan25_60);
      map1.removeLayer(Lscan25_70);
      map1.removeLayer(Lscan25_85);
      map1.removeLayer(Lscan25_98);
      map1.removeLayer(Lscan25_03);
	  map1.removeLayer(Lscan25_15);
	  map1.removeLayer(Lscan50_50);
	  map1.removeLayer(Lscan50_60);		  
	  map1.removeLayer(Lscan50_70);		  
	  map1.removeLayer(Lscan50_80);		  
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
      map1.removeLayer(L2009);
      map1.removeLayer(Lscan25_50);
      map1.removeLayer(Lscan25_60);
      map1.removeLayer(Lscan25_70);
      map1.removeLayer(Lscan25_85);
      map1.removeLayer(Lscan25_98);
      map1.removeLayer(Lscan25_03);
	  map1.removeLayer(Lscan25_15);
	  map1.removeLayer(Lscan50_50);
	  map1.removeLayer(Lscan50_60);		  
	  map1.removeLayer(Lscan50_70);		  
	  map1.removeLayer(Lscan50_80);		  
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
      map1.removeLayer(L2009);
      map1.removeLayer(Lscan25_50);
      map1.removeLayer(Lscan25_60);
      map1.removeLayer(Lscan25_70);
      map1.removeLayer(Lscan25_85);
      map1.removeLayer(Lscan25_98);
      map1.removeLayer(Lscan25_03);
	  map1.removeLayer(Lscan25_15);
	  map1.removeLayer(Lscan50_50);	
	  map1.removeLayer(Lscan50_60);		  
	  map1.removeLayer(Lscan50_70);		  
	  map1.removeLayer(Lscan50_80);		  
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
      map1.removeLayer(L2009);
      map1.removeLayer(Lscan25_50);
      map1.removeLayer(Lscan25_60);
      map1.removeLayer(Lscan25_70);
      map1.removeLayer(Lscan25_85);
      map1.removeLayer(Lscan25_98);
      map1.removeLayer(Lscan25_03);
	  map1.removeLayer(Lscan25_15);	  	  
	  map1.removeLayer(Lscan50_50);	
	  map1.removeLayer(Lscan50_60);		  
	  map1.removeLayer(Lscan50_70);		  
	  map1.removeLayer(Lscan50_80);		  
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
      map1.removeLayer(L2009);
      map1.removeLayer(Lscan25_50);
      map1.removeLayer(Lscan25_60);
      map1.removeLayer(Lscan25_70);
      map1.removeLayer(Lscan25_85);
      map1.removeLayer(Lscan25_98);
      map1.removeLayer(Lscan25_03);
	  map1.removeLayer(Lscan25_15);	  	  
	  map1.removeLayer(Lscan50_50);
	  map1.removeLayer(Lscan50_60);		  
	  map1.removeLayer(Lscan50_70);		  
	  map1.removeLayer(Lscan50_80);		  
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
      map1.removeLayer(L2009);
      map1.removeLayer(Lscan25_50);
      map1.removeLayer(Lscan25_60);
      map1.removeLayer(Lscan25_70);
      map1.removeLayer(Lscan25_85);
      map1.removeLayer(Lscan25_98);
      map1.removeLayer(Lscan25_03);
	  map1.removeLayer(Lscan25_15);	  	  
 	  map1.removeLayer(Lscan50_50);
	  map1.removeLayer(Lscan50_60);		  
	  map1.removeLayer(Lscan50_70);		  
	  map1.removeLayer(Lscan50_80);		  
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
      map1.removeLayer(L2009);
      map1.removeLayer(Lscan25_50);
      map1.removeLayer(Lscan25_60);
      map1.removeLayer(Lscan25_70);
      map1.removeLayer(Lscan25_85);
      map1.removeLayer(Lscan25_98);
      map1.removeLayer(Lscan25_03);
	  map1.removeLayer(Lscan25_15);	  	  
	  map1.removeLayer(Lscan50_50);	
	  map1.removeLayer(Lscan50_60);		  
	  map1.removeLayer(Lscan50_70);		  
	  map1.removeLayer(Lscan50_80);		  
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
      map1.removeLayer(L2009);
      map1.removeLayer(Lscan25_50);
      map1.removeLayer(Lscan25_60);
      map1.removeLayer(Lscan25_70);
      map1.removeLayer(Lscan25_85);
      map1.removeLayer(Lscan25_98);
      map1.removeLayer(Lscan25_03);
	  map1.removeLayer(Lscan25_15);	  	  
	  map1.removeLayer(Lscan50_50);	
	  map1.removeLayer(Lscan50_60);		  
	  map1.removeLayer(Lscan50_70);		  
	  map1.removeLayer(Lscan50_80);		  
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
      map1.removeLayer(L2009);
      map1.removeLayer(Lscan25_50);
      map1.removeLayer(Lscan25_60);
      map1.removeLayer(Lscan25_70);
      map1.removeLayer(Lscan25_85);
      map1.removeLayer(Lscan25_98);
      map1.removeLayer(Lscan25_03);
	  map1.removeLayer(Lscan25_15);	  	  
 	  map1.removeLayer(Lscan50_50);	
	  map1.removeLayer(Lscan50_60);		  
	  map1.removeLayer(Lscan50_70);		  
	  map1.removeLayer(Lscan50_80);		  
  }
 });
 
    $("[id='L2009']").on('switchChange.bootstrapSwitch',function(e,s){
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
      map1.addLayer(L2009);
      map1.removeLayer(Lscan25_50);
      map1.removeLayer(Lscan25_60);
      map1.removeLayer(Lscan25_70);
      map1.removeLayer(Lscan25_85);
      map1.removeLayer(Lscan25_98);
      map1.removeLayer(Lscan25_03);
	  map1.removeLayer(Lscan25_15);	  	  
 	  map1.removeLayer(Lscan50_50);	
	  map1.removeLayer(Lscan50_60);		  
	  map1.removeLayer(Lscan50_70);		  
	  map1.removeLayer(Lscan50_80);		  
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
      map1.removeLayer(L2009);
      map1.addLayer(Lscan25_50);
      map1.removeLayer(Lscan25_60);
      map1.removeLayer(Lscan25_70);
      map1.removeLayer(Lscan25_85);
      map1.removeLayer(Lscan25_98);
      map1.removeLayer(Lscan25_03);
	  map1.removeLayer(Lscan25_15);	  	  
	  map1.removeLayer(Lscan50_50);	
	  map1.removeLayer(Lscan50_60);		  
	  map1.removeLayer(Lscan50_70);		  
	  map1.removeLayer(Lscan50_80);		  
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
      map1.removeLayer(L2009);
      map1.removeLayer(Lscan25_50);
      map1.addLayer(Lscan25_60);
      map1.removeLayer(Lscan25_70);
      map1.removeLayer(Lscan25_85);
      map1.removeLayer(Lscan25_98);
      map1.removeLayer(Lscan25_03);
	  map1.removeLayer(Lscan25_15);	  
	  map1.removeLayer(Lscan50_50);	
	  map1.removeLayer(Lscan50_60);		  
	  map1.removeLayer(Lscan50_70);		  
	  map1.removeLayer(Lscan50_80);		  
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
      map1.removeLayer(L2009);
      map1.removeLayer(Lscan25_50);
      map1.removeLayer(Lscan25_60);
      map1.addLayer(Lscan25_70);
      map1.removeLayer(Lscan25_85);
      map1.removeLayer(Lscan25_98);
      map1.removeLayer(Lscan25_03);
	  map1.removeLayer(Lscan25_15);	  
	  map1.removeLayer(Lscan50_50);		
	  map1.removeLayer(Lscan50_60);		  
	  map1.removeLayer(Lscan50_70);		  
	  map1.removeLayer(Lscan50_80);		  
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
      map1.removeLayer(L2009);
      map1.removeLayer(Lscan25_50);
      map1.removeLayer(Lscan25_60);
      map1.removeLayer(Lscan25_70);
      map1.addLayer(Lscan25_85);
      map1.removeLayer(Lscan25_98);
      map1.removeLayer(Lscan25_03);
	  map1.removeLayer(Lscan25_15);	  	  
	  map1.removeLayer(Lscan50_50);		
	  map1.removeLayer(Lscan50_60);		  
	  map1.removeLayer(Lscan50_70);		  
	  map1.removeLayer(Lscan50_80);		  
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
      map1.removeLayer(L2009);
      map1.removeLayer(Lscan25_50);
      map1.removeLayer(Lscan25_60);
      map1.removeLayer(Lscan25_70);
      map1.removeLayer(Lscan25_85);
      map1.addLayer(Lscan25_98);
      map1.removeLayer(Lscan25_03);
	  map1.removeLayer(Lscan25_15);	  	  
	  map1.removeLayer(Lscan50_50);	
	  map1.removeLayer(Lscan50_60);		  
	  map1.removeLayer(Lscan50_70);		  
	  map1.removeLayer(Lscan50_80);		  
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
      map1.removeLayer(L2009);
      map1.removeLayer(Lscan25_50);
      map1.removeLayer(Lscan25_60);
      map1.removeLayer(Lscan25_70);
      map1.removeLayer(Lscan25_85);
      map1.removeLayer(Lscan25_98);
      map1.addLayer(Lscan25_03);
	  map1.removeLayer(Lscan25_15);	  
	  map1.removeLayer(Lscan50_50);	
	  map1.removeLayer(Lscan50_60);		  
	  map1.removeLayer(Lscan50_70);		  
	  map1.removeLayer(Lscan50_80);		  
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
      map1.removeLayer(L2009);
      map1.removeLayer(Lscan25_50);
      map1.removeLayer(Lscan25_60);
      map1.removeLayer(Lscan25_70);
      map1.removeLayer(Lscan25_85);
      map1.removeLayer(Lscan25_98);
      map1.removeLayer(Lscan25_03);
	  map1.addLayer(Lscan25_15);
	  map1.removeLayer(Lscan50_50);	
	  map1.removeLayer(Lscan50_60);		  
	  map1.removeLayer(Lscan50_70);		  
	  map1.removeLayer(Lscan50_80);		  
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
      map1.removeLayer(L2009);
      map1.removeLayer(Lscan25_50);
      map1.removeLayer(Lscan25_60);
      map1.removeLayer(Lscan25_70);
      map1.removeLayer(Lscan25_85);
      map1.removeLayer(Lscan25_98);
      map1.removeLayer(Lscan25_03);
	  map1.removeLayer(Lscan25_15);
	  map1.addLayer(Lscan50_50);	
	  map1.removeLayer(Lscan50_60);		  
	  map1.removeLayer(Lscan50_70);		  
	  map1.removeLayer(Lscan50_80);		  
   }
 }); 
 
  $("[id='Lscan50_60']").on('switchChange.bootstrapSwitch',function(e,s){
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
      map1.removeLayer(L2009);
      map1.removeLayer(Lscan25_50);
      map1.removeLayer(Lscan25_60);
      map1.removeLayer(Lscan25_70);
      map1.removeLayer(Lscan25_85);
      map1.removeLayer(Lscan25_98);
      map1.removeLayer(Lscan25_03);
	  map1.removeLayer(Lscan25_15);
	  map1.removeLayer(Lscan50_50);	
	  map1.addLayer(Lscan50_60);		  
	  map1.removeLayer(Lscan50_70);		  
	  map1.removeLayer(Lscan50_80);		  
   }
 }); 
 
  $("[id='Lscan50_70']").on('switchChange.bootstrapSwitch',function(e,s){
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
      map1.removeLayer(L2009);
      map1.removeLayer(Lscan25_50);
      map1.removeLayer(Lscan25_60);
      map1.removeLayer(Lscan25_70);
      map1.removeLayer(Lscan25_85);
      map1.removeLayer(Lscan25_98);
      map1.removeLayer(Lscan25_03);
	  map1.removeLayer(Lscan25_15);
	  map1.removeLayer(Lscan50_50);	
	  map1.removeLayer(Lscan50_60);		  
	  map1.addLayer(Lscan50_70);		  
	  map1.removeLayer(Lscan50_80);		  
   }
 }); 
 
  $("[id='Lscan50_80']").on('switchChange.bootstrapSwitch',function(e,s){
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
      map1.removeLayer(L2009);
      map1.removeLayer(Lscan25_50);
      map1.removeLayer(Lscan25_60);
      map1.removeLayer(Lscan25_70);
      map1.removeLayer(Lscan25_85);
      map1.removeLayer(Lscan25_98);
      map1.removeLayer(Lscan25_03);
	  map1.removeLayer(Lscan25_15);
	  map1.removeLayer(Lscan50_50);	
	  map1.removeLayer(Lscan50_60);		  
	  map1.removeLayer(Lscan50_70);		  
	  map1.addLayer(Lscan50_80);		  
   }
 });
  
$(".bs").bootstrapSwitch('state', false);


// Draw option on map1
		var LeafIcon = L.Icon.extend({
			options: {
				shadowUrl: 
				    'http://leafletjs.com/docs/images/leaf-shadow.png',
				iconSize:     [100, 95],
				shadowSize:   [50, 64],
				iconAnchor:   [22, 94],
				shadowAnchor: [4, 62],
				popupAnchor:  [-3, -76]
			}
		});

		var greenIcon = new LeafIcon({
			iconUrl: 'http://leafletjs.com/docs/images/leaf-green.png'
			});

		var drawnItems = new L.FeatureGroup();
		map1.addLayer(drawnItems);
        var drawControl = new L.Control.Draw({
            position: 'topright',
            draw: {
                polyline: {
					shapeOptions:{
						color:'red'},
						},
                polygon: {
					shapeOptions: {
						color: 'purple'
					},
					allowIntersection: false,
					drawError: {
						color: 'orange',
						timeout: 1000
					},
					showArea: true,
					metric: true,
					repeatMode: true
				},
                circle: false,
                marker: false
            },
            edit: {
                featureGroup: drawnItems,
                remove: true
            }
        });
		map1.addControl(drawControl);
		map1.on('draw:created', function (e) {
			var type = e.layerType,
				layer = e.layer;

			if (type === 'marker') {
				layer.bindPopup('A popup!');
			}

			drawnItems.addLayer(layer);
		});		



// map2

var map2 = L.map('map2', {
    maxZoom: 18, 
    minZoom: 13, 
zoomControl: true
}).setView([45.7604276, 4.8335709], 16);

var ROSM = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}
).addTo(map2);

var R1954 = L.tileLayer.wms('http://a.map.webarmature.fr/geoserver/wms/', {
	layers: 'data_all_1954',
	transparent: true,
	attribution: 'Ann&#233;e : 1954 - &copy; <a href="http://www.geoportail.gouv.fr/">IGN - Photos a&#233;riennes 1954</a>'});
	
var R1966 = L.tileLayer.wms('http://a.map.webarmature.fr/geoserver/wms/', {
	layers: 'data_all_1966',
	transparent: true,
	attribution: 'Ann&#233;e : 1966 - &copy; <a href="http://www.geoportail.gouv.fr/">IGN - Photos a&#233;riennes 1966</a>'});
	
var R1978 = L.tileLayer.wms('http://a.map.webarmature.fr/geoserver/wms/', {
	layers: 'data_all_1978',
	transparent: true,
	attribution: 'Ann&#233;e : 1978 - &copy; <a href="http://www.geoportail.gouv.fr/">IGN - Photos a&#233;riennes 1978</a>'});
	
var R1986 = L.tileLayer.wms('http://a.map.webarmature.fr/geoserver/wms/', {
	layers: 'data_all_1986',
	transparent: true,
	attribution: 'Ann&#233;e : 1986 - &copy; <a href="http://www.geoportail.gouv.fr/">IGN - Photos a&#233;riennes 1986</a>'});
	
var R1993 = L.tileLayer.wms('http://a.map.webarmature.fr/geoserver/wms/', {
	layers: 'data_all_1993',
	transparent: true,
	attribution: 'Ann&#233;e : 1993 - &copy; <a href="http://www.grandlyon.com/"> Grand Lyon orthophotographie 1993</a>'});
	
var R1997 = L.tileLayer.wms('http://a.map.webarmature.fr/geoserver/wms/', {
	layers: 'data_all_1997',
	transparent: true,
	attribution: 'Ann&#233;e : 1997 - &copy; <a href="http://www.grandlyon.com/"> Grand Lyon orthophotographie 1997</a>'});
	
var R2003 = L.tileLayer.wms('http://a.map.webarmature.fr/geoserver/wms/', {
	layers: 'data_all_2003',
	transparent: true,
	attribution: 'Ann&#233;e : 2003 - &copy; <a href="http://www.grandlyon.com/"> Grand Lyon orthophotographie 2003</a>'});
	
var R2007 = L.tileLayer.wms('http://a.map.webarmature.fr/geoserver/wms/', {
	layers: 'data_all_2007',
	transparent: true,
	attribution: 'Ann&#233;e : 2007 - &copy; <a href="http://www.grandlyon.com/"> Grand Lyon orthophotographie 2007</a>'});
	
var R2009 = L.tileLayer.wms('http://a.map.webarmature.fr/geoserver/wms/', {
	layers: 'data_all_2009',
	transparent: true,
	attribution: 'Ann&#233;e : 2009 - &copy; <a href="http://www.grandlyon.com/"> Grand Lyon orthophotographie 2009</a>'});
	
var Rscan25_50 = L.tileLayer.wms('http://a.map.webarmature.fr/geoserver/wms/', {
	layers: 'scan25_all_1950',
	transparent: true,
	attribution: 'Ann&#233;e : 1950 - &copy; <a href="http://ign.fr/"> Scan 25 1950</a>'});

var Rscan25_60 = L.tileLayer.wms('http://a.map.webarmature.fr/geoserver/wms/', {
	layers: 'scan25_all_1960',
	transparent: true,
	attribution: 'Ann&#233;e : 1960 - &copy; <a href="http://ign.fr/"> Scan 25 1960</a>'});

var Rscan25_70 = L.tileLayer.wms('http://a.map.webarmature.fr/geoserver/wms/', {
	layers: 'scan25_all_1970',
	transparent: true,
	attribution: 'Ann&#233;e : 1970 - &copy; <a href="http://ign.fr/"> Scan 25 1970</a>'});

var Rscan25_85 = L.tileLayer.wms('http://a.map.webarmature.fr/geoserver/wms/', {
	layers: 'scan25_all_1985',
	transparent: true,
	attribution: 'Ann&#233;e : 1985 - &copy; <a href="http://ign.fr/"> Scan 25 1985</a>'});

var Rscan25_98 = L.tileLayer.wms('http://a.map.webarmature.fr/geoserver/wms/', {
	layers: 'scan25_lyon_1998',
	transparent: true,
	attribution: 'Ann&#233;e : 1998 - &copy; <a href="http://ign.fr/"> Scan 25 1998</a>'});

var Rscan25_03 = L.tileLayer.wms('http://a.map.webarmature.fr/geoserver/wms/', {
	layers: 'scan25_all_2003',
	transparent: true,
	attribution: 'Ann&#233;e : 2003 - &copy; <a href="http://ign.fr/"> Scan 25 2003</a>'});
	
var Rscan25_15 = L.tileLayer.wms('http://a.map.webarmature.fr/geoserver/wms/', {
	layers: 'scan25_all_2015',
	transparent: true,
	attribution: 'Ann&#233;e : 2015 - &copy; <a href="http://ign.fr/"> Scan 25 2015</a>'});
	
var Rscan50_50 = L.tileLayer.wms('http://a.map.webarmature.fr/geoserver/wms/', {
	layers: 'scan50_all_1950',
	transparent: true,
	attribution: 'Ann&#233;e : 1950 - &copy; <a href="http://ign.fr/"> Scan 50 1950</a>'});
	
var Rscan50_60 = L.tileLayer.wms('http://a.map.webarmature.fr/geoserver/wms/', {
	layers: 'scan50_all_1960_clip',
	transparent: true,
	attribution: 'Ann&#233;e : 1960 - &copy; <a href="http://ign.fr/"> Scan 50 1960</a>'});
	
var Rscan50_70 = L.tileLayer.wms('http://a.map.webarmature.fr/geoserver/wms/', {
	layers: 'scan50_all_1970_clip',
	transparent: true,
	attribution: 'Ann&#233;e : 1970 - &copy; <a href="http://ign.fr/"> Scan 50 1970</a>'});
	
var Rscan50_80 = L.tileLayer.wms('http://a.map.webarmature.fr/geoserver/wms/', {
	layers: 'scan50_all_1980_clip',
	transparent: true,
	attribution: 'Ann&#233;e : 1980 - &copy; <a href="http://ign.fr/"> Scan 50 1980</a>'});

var popup = L.popup();

map2.zoomControl.setPosition('topleft');

$("[id='ROSM']").bootstrapSwitch('state',true);

$("[id='ROSM']").on('switchChange.bootstrapSwitch',function(e,s){
  	if (s == true){ 
	  map2.addLayer(ROSM);
      map2.removeLayer(R1954);
      map2.removeLayer(R1966);
      map2.removeLayer(R1978);
      map2.removeLayer(R1986);
      map2.removeLayer(R1993);
      map2.removeLayer(R1997);
      map2.removeLayer(R2003);
      map2.removeLayer(R2007);
      map2.removeLayer(R2009);
      map2.removeLayer(Rscan25_50);
      map2.removeLayer(Rscan25_60);
      map2.removeLayer(Rscan25_70);
      map2.removeLayer(Rscan25_85);
      map2.removeLayer(Rscan25_98);
      map2.removeLayer(Rscan25_03);
	  map2.removeLayer(Rscan25_15);
	  map2.removeLayer(Rscan50_50);
	  map2.removeLayer(Rscan50_60);
	  map2.removeLayer(Rscan50_70);
	  map2.removeLayer(Rscan50_80);		  
   }
 });
 
$("[id='R1954']").on('switchChange.bootstrapSwitch',function(e,s){
  	if (s == true){ 
	  map2.removeLayer(ROSM);
      map2.addLayer(R1954);
      map2.removeLayer(R1966);
      map2.removeLayer(R1978);
      map2.removeLayer(R1986);
      map2.removeLayer(R1993);
      map2.removeLayer(R1997);
      map2.removeLayer(R2003);
      map2.removeLayer(R2007);
      map2.removeLayer(R2009);
      map2.removeLayer(Rscan25_50);
      map2.removeLayer(Rscan25_60);
      map2.removeLayer(Rscan25_70);
      map2.removeLayer(Rscan25_85);
      map2.removeLayer(Rscan25_98);
      map2.removeLayer(Rscan25_03);
	  map2.removeLayer(Rscan25_15);
	  map2.removeLayer(Rscan50_50);	
	  map2.removeLayer(Rscan50_60);
	  map2.removeLayer(Rscan50_70);
	  map2.removeLayer(Rscan50_80);		  
   }
 });

$("[id='R1966']").on('switchChange.bootstrapSwitch',function(e,s){
  	if (s == true){ 
	  map2.removeLayer(ROSM);
      map2.removeLayer(R1954);
      map2.addLayer(R1966);
      map2.removeLayer(R1978);
      map2.removeLayer(R1986);
      map2.removeLayer(R1993);
      map2.removeLayer(R1997);
      map2.removeLayer(R2003);
      map2.removeLayer(R2007);
      map2.removeLayer(R2009);
      map2.removeLayer(Rscan25_50);
      map2.removeLayer(Rscan25_60);
      map2.removeLayer(Rscan25_70);
      map2.removeLayer(Rscan25_85);
      map2.removeLayer(Rscan25_98);
      map2.removeLayer(Rscan25_03);
	  map2.removeLayer(Rscan25_15);
	  map2.removeLayer(Rscan50_50);
	  map2.removeLayer(Rscan50_60);
	  map2.removeLayer(Rscan50_70);
	  map2.removeLayer(Rscan50_80);		  
   }
 });
 
$("[id='R1978']").on('switchChange.bootstrapSwitch',function(e,s){
  	if (s == true){ 
	  map2.removeLayer(ROSM);
      map2.removeLayer(R1954);
      map2.removeLayer(R1966);
      map2.addLayer(R1978);
      map2.removeLayer(R1986);
      map2.removeLayer(R1993);
      map2.removeLayer(R1997);
      map2.removeLayer(R2003);
      map2.removeLayer(R2007);
      map2.removeLayer(R2009);
      map2.removeLayer(Rscan25_50);
      map2.removeLayer(Rscan25_60);
      map2.removeLayer(Rscan25_70);
      map2.removeLayer(Rscan25_85);
      map2.removeLayer(Rscan25_98);
      map2.removeLayer(Rscan25_03);
	  map2.removeLayer(Rscan25_15);	  	  
	  map2.removeLayer(Rscan50_50);	
	  map2.removeLayer(Rscan50_60);
	  map2.removeLayer(Rscan50_70);
	  map2.removeLayer(Rscan50_80);		  
   }
 });

$("[id='R1986']").on('switchChange.bootstrapSwitch',function(e,s){
  	if (s == true){ 
	  map2.removeLayer(ROSM);
      map2.removeLayer(R1954);
      map2.removeLayer(R1966);
      map2.removeLayer(R1978);
      map2.addLayer(R1986);
      map2.removeLayer(R1993);
      map2.removeLayer(R1997);
      map2.removeLayer(R2003);
      map2.removeLayer(R2007);
      map2.removeLayer(R2009);
      map2.removeLayer(Rscan25_50);
      map2.removeLayer(Rscan25_60);
      map2.removeLayer(Rscan25_70);
      map2.removeLayer(Rscan25_85);
      map2.removeLayer(Rscan25_98);
      map2.removeLayer(Rscan25_03);
	  map2.removeLayer(Rscan25_15);	  	  
	  map2.removeLayer(Rscan50_50);	
	  map2.removeLayer(Rscan50_60);
	  map2.removeLayer(Rscan50_70);
	  map2.removeLayer(Rscan50_80);		  
   }
 });

$("[id='R1993']").on('switchChange.bootstrapSwitch',function(e,s){
  	if (s == true){ 
	  map2.removeLayer(ROSM);
      map2.removeLayer(R1954);
      map2.removeLayer(R1966);
      map2.removeLayer(R1978);
      map2.removeLayer(R1986);
      map2.addLayer(R1993);
      map2.removeLayer(R1997);
      map2.removeLayer(R2003);
      map2.removeLayer(R2007);
      map2.removeLayer(R2009);
      map2.removeLayer(Rscan25_50);
      map2.removeLayer(Rscan25_60);
      map2.removeLayer(Rscan25_70);
      map2.removeLayer(Rscan25_85);
      map2.removeLayer(Rscan25_98);
      map2.removeLayer(Rscan25_03);
	  map2.removeLayer(Rscan25_15);	  	  
 	  map2.removeLayer(Rscan50_50);	
	  map2.removeLayer(Rscan50_60);
	  map2.removeLayer(Rscan50_70);
	  map2.removeLayer(Rscan50_80);		  
  }
 });
 
 $("[id='R1997']").on('switchChange.bootstrapSwitch',function(e,s){
  	if (s == true){ 
	  map2.removeLayer(ROSM);
      map2.removeLayer(R1954);
      map2.removeLayer(R1966);
      map2.removeLayer(R1978);
      map2.removeLayer(R1986);
      map2.removeLayer(R1993);
      map2.addLayer(R1997);
      map2.removeLayer(R2003);
      map2.removeLayer(R2007);
      map2.removeLayer(R2009);
      map2.removeLayer(Rscan25_50);
      map2.removeLayer(Rscan25_60);
      map2.removeLayer(Rscan25_70);
      map2.removeLayer(Rscan25_85);
      map2.removeLayer(Rscan25_98);
      map2.removeLayer(Rscan25_03);
	  map2.removeLayer(Rscan25_15);	  	  
	  map2.removeLayer(Rscan50_50);	
	  map2.removeLayer(Rscan50_60);
	  map2.removeLayer(Rscan50_70);
	  map2.removeLayer(Rscan50_80);		  
   }
 });
 
  $("[id='R2003']").on('switchChange.bootstrapSwitch',function(e,s){
  	if (s == true){ 
	  map2.removeLayer(ROSM);
      map2.removeLayer(R1954);
      map2.removeLayer(R1966);
      map2.removeLayer(R1978);
      map2.removeLayer(R1986);
      map2.removeLayer(R1993);
      map2.removeLayer(R1997);
      map2.addLayer(R2003);
      map2.removeLayer(R2007);
      map2.removeLayer(R2009);
      map2.removeLayer(Rscan25_50);
      map2.removeLayer(Rscan25_60);
      map2.removeLayer(Rscan25_70);
      map2.removeLayer(Rscan25_85);
      map2.removeLayer(Rscan25_98);
      map2.removeLayer(Rscan25_03);
	  map2.removeLayer(Rscan25_15);	  	  
	  map2.removeLayer(Rscan50_50);	
	  map2.removeLayer(Rscan50_60);
	  map2.removeLayer(Rscan50_70);
	  map2.removeLayer(Rscan50_80);		  
   }
 });
  
   $("[id='R2007']").on('switchChange.bootstrapSwitch',function(e,s){
  	if (s == true){ 
	  map2.removeLayer(ROSM);
      map2.removeLayer(R1954);
      map2.removeLayer(R1966);
      map2.removeLayer(R1978);
      map2.removeLayer(R1986);
      map2.removeLayer(R1993);
      map2.removeLayer(R1997);
      map2.removeLayer(R2003);
      map2.addLayer(R2007);
      map2.removeLayer(R2009);
      map2.removeLayer(Rscan25_50);
      map2.removeLayer(Rscan25_60);
      map2.removeLayer(Rscan25_70);
      map2.removeLayer(Rscan25_85);
      map2.removeLayer(Rscan25_98);
      map2.removeLayer(Rscan25_03);
	  map2.removeLayer(Rscan25_15);	  	  
 	  map2.removeLayer(Rscan50_50);	
	  map2.removeLayer(Rscan50_60);
	  map2.removeLayer(Rscan50_70);
	  map2.removeLayer(Rscan50_80);		  
  }
 });
 
   $("[id='R2009']").on('switchChange.bootstrapSwitch',function(e,s){
  	if (s == true){ 
	  map2.removeLayer(ROSM);
      map2.removeLayer(R1954);
      map2.removeLayer(R1966);
      map2.removeLayer(R1978);
      map2.removeLayer(R1986);
      map2.removeLayer(R1993);
      map2.removeLayer(R1997);
      map2.removeLayer(R2003);
      map2.removeLayer(R2007);
      map2.addLayer(R2009);
      map2.removeLayer(Rscan25_50);
      map2.removeLayer(Rscan25_60);
      map2.removeLayer(Rscan25_70);
      map2.removeLayer(Rscan25_85);
      map2.removeLayer(Rscan25_98);
      map2.removeLayer(Rscan25_03);
	  map2.removeLayer(Rscan25_15);	  	  
 	  map2.removeLayer(Rscan50_50);	
	  map2.removeLayer(Rscan50_60);
	  map2.removeLayer(Rscan50_70);
	  map2.removeLayer(Rscan50_80);		  
  }
 }); 
 
    $("[id='Rscan25_50']").on('switchChange.bootstrapSwitch',function(e,s){
  	if (s == true){ 
	  map2.removeLayer(ROSM);
      map2.removeLayer(R1954);
      map2.removeLayer(R1966);
      map2.removeLayer(R1978);
      map2.removeLayer(R1986);
      map2.removeLayer(R1993);
      map2.removeLayer(R1997);
      map2.removeLayer(R2003);
      map2.removeLayer(R2007);
      map2.removeLayer(R2009);
      map2.addLayer(Rscan25_50);
      map2.removeLayer(Rscan25_60);
      map2.removeLayer(Rscan25_70);
      map2.removeLayer(Rscan25_85);
      map2.removeLayer(Rscan25_98);
      map2.removeLayer(Rscan25_03);
	  map2.removeLayer(Rscan25_15);	  	  
	  map2.removeLayer(Rscan50_50);	
	  map2.removeLayer(Rscan50_60);
	  map2.removeLayer(Rscan50_70);
	  map2.removeLayer(Rscan50_80);		  
   }
 });
 
     $("[id='Rscan25_60']").on('switchChange.bootstrapSwitch',function(e,s){
  	if (s == true){ 
	  map2.removeLayer(ROSM);
      map2.removeLayer(R1954);
      map2.removeLayer(R1966);
      map2.removeLayer(R1978);
      map2.removeLayer(R1986);
      map2.removeLayer(R1993);
      map2.removeLayer(R1997);
      map2.removeLayer(R2003);
      map2.removeLayer(R2007);
      map2.removeLayer(R2009);
      map2.removeLayer(Rscan25_50);
      map2.addLayer(Rscan25_60);
      map2.removeLayer(Rscan25_70);
      map2.removeLayer(Rscan25_85);
      map2.removeLayer(Rscan25_98);
      map2.removeLayer(Rscan25_03);
	  map2.removeLayer(Rscan25_15);	  
	  map2.removeLayer(Rscan50_50);	
	  map2.removeLayer(Rscan50_60);
	  map2.removeLayer(Rscan50_70);
	  map2.removeLayer(Rscan50_80);		  
   }
 }); 
 
     $("[id='Rscan25_70']").on('switchChange.bootstrapSwitch',function(e,s){
  	if (s == true){ 
	  map2.removeLayer(ROSM);
      map2.removeLayer(R1954);
      map2.removeLayer(R1966);
      map2.removeLayer(R1978);
      map2.removeLayer(R1986);
      map2.removeLayer(R1993);
      map2.removeLayer(R1997);
      map2.removeLayer(R2003);
      map2.removeLayer(R2007);
      map2.removeLayer(R2009);
      map2.removeLayer(Rscan25_50);
      map2.removeLayer(Rscan25_60);
      map2.addLayer(Rscan25_70);
      map2.removeLayer(Rscan25_85);
      map2.removeLayer(Rscan25_98);
      map2.removeLayer(Rscan25_03);
	  map2.removeLayer(Rscan25_15);	  
	  map2.removeLayer(Rscan50_50);	
	  map2.removeLayer(Rscan50_60);
	  map2.removeLayer(Rscan50_70);
	  map2.removeLayer(Rscan50_80);		  
   }
 });
 
      $("[id='Rscan25_85']").on('switchChange.bootstrapSwitch',function(e,s){
  	if (s == true){ 
	  map2.removeLayer(ROSM);
      map2.removeLayer(R1954);
      map2.removeLayer(R1966);
      map2.removeLayer(R1978);
      map2.removeLayer(R1986);
      map2.removeLayer(R1993);
      map2.removeLayer(R1997);
      map2.removeLayer(R2003);
      map2.removeLayer(R2007);
      map2.removeLayer(R2009);
      map2.removeLayer(Rscan25_50);
      map2.removeLayer(Rscan25_60);
      map2.removeLayer(Rscan25_70);
      map2.addLayer(Rscan25_85);
      map2.removeLayer(Rscan25_98);
      map2.removeLayer(Rscan25_03);
	  map2.removeLayer(Rscan25_15);	  	  
	  map2.removeLayer(Rscan50_50);	
	  map2.removeLayer(Rscan50_60);
	  map2.removeLayer(Rscan50_70);
	  map2.removeLayer(Rscan50_80);		  
   }
 });
 
$("[id='Rscan25_98']").on('switchChange.bootstrapSwitch',function(e,s){
  	if (s == true){ 
	  map2.removeLayer(ROSM);
      map2.removeLayer(R1954);
      map2.removeLayer(R1966);
      map2.removeLayer(R1978);
      map2.removeLayer(R1986);
      map2.removeLayer(R1993);
      map2.removeLayer(R1997);
      map2.removeLayer(R2003);
      map2.removeLayer(R2007);
      map2.removeLayer(R2009);
      map2.removeLayer(Rscan25_50);
      map2.removeLayer(Rscan25_60);
      map2.removeLayer(Rscan25_70);
      map2.removeLayer(Rscan25_85);
      map2.addLayer(Rscan25_98);
      map2.removeLayer(Rscan25_03);
	  map2.removeLayer(Rscan25_15);	  	  
	  map2.removeLayer(Rscan50_50);	
	  map2.removeLayer(Rscan50_60);
	  map2.removeLayer(Rscan50_70);
	  map2.removeLayer(Rscan50_80);		  
   }
 });
 
$("[id='Rscan25_03']").on('switchChange.bootstrapSwitch',function(e,s){
  	if (s == true){ 
	  map2.removeLayer(ROSM);
      map2.removeLayer(R1954);
      map2.removeLayer(R1966);
      map2.removeLayer(R1978);
      map2.removeLayer(R1986);
      map2.removeLayer(R1993);
      map2.removeLayer(R1997);
      map2.removeLayer(R2003);
      map2.removeLayer(R2007);
      map2.removeLayer(R2009);
      map2.removeLayer(Rscan25_50);
      map2.removeLayer(Rscan25_60);
      map2.removeLayer(Rscan25_70);
      map2.removeLayer(Rscan25_85);
      map2.removeLayer(Rscan25_98);
      map2.addLayer(Rscan25_03);
	  map2.removeLayer(Rscan25_15);	  
	  map2.removeLayer(Rscan50_50);	
	  map2.removeLayer(Rscan50_60);
	  map2.removeLayer(Rscan50_70);
	  map2.removeLayer(Rscan50_80);		  
   }
 });
 
 $("[id='Rscan25_15']").on('switchChange.bootstrapSwitch',function(e,s){
  	if (s == true){ 
	  map2.removeLayer(ROSM);
      map2.removeLayer(R1954);
      map2.removeLayer(R1966);
      map2.removeLayer(R1978);
      map2.removeLayer(R1986);
      map2.removeLayer(R1993);
      map2.removeLayer(R1997);
      map2.removeLayer(R2003);
      map2.removeLayer(R2007);
      map2.removeLayer(R2009);
      map2.removeLayer(Rscan25_50);
      map2.removeLayer(Rscan25_60);
      map2.removeLayer(Rscan25_70);
      map2.removeLayer(Rscan25_85);
      map2.removeLayer(Rscan25_98);
      map2.removeLayer(Rscan25_03);
	  map2.addLayer(Rscan25_15);
	  map2.removeLayer(Rscan50_50);	
	  map2.removeLayer(Rscan50_60);
	  map2.removeLayer(Rscan50_70);
	  map2.removeLayer(Rscan50_80);		  
   }
 });
 
  $("[id='Rscan50_50']").on('switchChange.bootstrapSwitch',function(e,s){
  	if (s == true){ 
	  map2.removeLayer(ROSM);
      map2.removeLayer(R1954);
      map2.removeLayer(R1966);
      map2.removeLayer(R1978);
      map2.removeLayer(R1986);
      map2.removeLayer(R1993);
      map2.removeLayer(R1997);
      map2.removeLayer(R2003);
      map2.removeLayer(R2007);
      map2.removeLayer(R2009);
      map2.removeLayer(Rscan25_50);
      map2.removeLayer(Rscan25_60);
      map2.removeLayer(Rscan25_70);
      map2.removeLayer(Rscan25_85);
      map2.removeLayer(Rscan25_98);
      map2.removeLayer(Rscan25_03);
	  map2.removeLayer(Rscan25_15);
	  map2.addLayer(Rscan50_50);	
	  map2.removeLayer(Rscan50_60);
	  map2.removeLayer(Rscan50_70);
	  map2.removeLayer(Rscan50_80);		  
   }
 });
  
  $("[id='Rscan50_60']").on('switchChange.bootstrapSwitch',function(e,s){
  	if (s == true){ 
	  map2.removeLayer(ROSM);
      map2.removeLayer(R1954);
      map2.removeLayer(R1966);
      map2.removeLayer(R1978);
      map2.removeLayer(R1986);
      map2.removeLayer(R1993);
      map2.removeLayer(R1997);
      map2.removeLayer(R2003);
      map2.removeLayer(R2007);
      map2.removeLayer(R2009);
      map2.removeLayer(Rscan25_50);
      map2.removeLayer(Rscan25_60);
      map2.removeLayer(Rscan25_70);
      map2.removeLayer(Rscan25_85);
      map2.removeLayer(Rscan25_98);
      map2.removeLayer(Rscan25_03);
	  map2.removeLayer(Rscan25_15);
	  map2.removeLayer(Rscan50_50);	
	  map2.addLayer(Rscan50_60);
	  map2.removeLayer(Rscan50_70);
	  map2.removeLayer(Rscan50_80);		  
   }
 });
  
  $("[id='Rscan50_70']").on('switchChange.bootstrapSwitch',function(e,s){
  	if (s == true){ 
	  map2.removeLayer(ROSM);
      map2.removeLayer(R1954);
      map2.removeLayer(R1966);
      map2.removeLayer(R1978);
      map2.removeLayer(R1986);
      map2.removeLayer(R1993);
      map2.removeLayer(R1997);
      map2.removeLayer(R2003);
      map2.removeLayer(R2007);
      map2.removeLayer(R2009);
      map2.removeLayer(Rscan25_50);
      map2.removeLayer(Rscan25_60);
      map2.removeLayer(Rscan25_70);
      map2.removeLayer(Rscan25_85);
      map2.removeLayer(Rscan25_98);
      map2.removeLayer(Rscan25_03);
	  map2.removeLayer(Rscan25_15);
	  map2.removeLayer(Rscan50_50);	
	  map2.removeLayer(Rscan50_60);
	  map2.addLayer(Rscan50_70);
	  map2.removeLayer(Rscan50_80);		  
   }
 });
  
  $("[id='Rscan50_80']").on('switchChange.bootstrapSwitch',function(e,s){
  	if (s == true){ 
	  map2.removeLayer(ROSM);
      map2.removeLayer(R1954);
      map2.removeLayer(R1966);
      map2.removeLayer(R1978);
      map2.removeLayer(R1986);
      map2.removeLayer(R1993);
      map2.removeLayer(R1997);
      map2.removeLayer(R2003);
      map2.removeLayer(R2007);
      map2.removeLayer(R2009);
      map2.removeLayer(Rscan25_50);
      map2.removeLayer(Rscan25_60);
      map2.removeLayer(Rscan25_70);
      map2.removeLayer(Rscan25_85);
      map2.removeLayer(Rscan25_98);
      map2.removeLayer(Rscan25_03);
	  map2.removeLayer(Rscan25_15);
	  map2.removeLayer(Rscan50_50);	
	  map2.removeLayer(Rscan50_60);
	  map2.removeLayer(Rscan50_70);
	  map2.addLayer(Rscan50_80);		  
   }
 });
 




// syncmap
	// when either map finishes moving, trigger an update on the other one.
	map1.on('moveend', follow).on('zoomend', follow);
	map2.on('moveend', follow).on('zoomend', follow);
	var quiet = false;
	function follow(e) {
		if (quiet) return;
		quiet = true;
		if (e.target === map1) sync(map2, e);
		if (e.target === map2) sync(map1, e);
		quiet = false;
	}

	// sync simply steals the settings from the moved map (e.target)
	// and applies them to the other map.
	function sync(map, e) {
		map.setView(e.target.getCenter(), e.target.getZoom(), {
			animate: false,
			reset: true
		});
	}

L.control.scale().addTo(map1);
L.control.scale().addTo(map2);

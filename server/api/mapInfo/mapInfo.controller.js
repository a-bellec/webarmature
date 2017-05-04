'use strict';

const request = require('request');
const martinez = require('martinez-polygon-clipping');
const geojsonArea = require('geojson-area');
const proj4 = require('proj4');

//Define France projection
proj4.defs('EPSG:2154', '+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs ');

export function proxyPointInfo(req, res) {
  let url = req.body.url;

  request(url, function (error, response) {
    res.send(response.body);
  });
}

let getDataToSort = function (dataToAnalyse) {
  let features = dataToAnalyse.features;

  let dataToReturn = [];
  for (let i = 0; i < features.length; i++) {
    let itemToAdd = {percentPermeable: 0, shapeArea: 0};

    let percentageToCheck = features[i].properties.percent_aa;

    if (percentageToCheck >= 0 && percentageToCheck <= 100) {
      itemToAdd.percentPermeable = parseFloat(percentageToCheck.toFixed(2));
      itemToAdd.shapeArea = Math.round(features[i].properties.Shape_Area.toFixed(2));
      dataToReturn.push(itemToAdd);
    }
  }

  return dataToReturn;
};

let sortData = function (dataToSort) {
  let dataToShow = [0, 0, 0, 0, 0];
  for (let point of dataToSort) {
    if (point.percentPermeable <= 20) {
      dataToShow[0] += point.shapeArea;
    } else if (point.percentPermeable > 20 && point.percentPermeable <= 40) {
      dataToShow[1] += point.shapeArea;
    } else if (point.percentPermeable > 40 && point.percentPermeable <= 60) {
      dataToShow[2] += point.shapeArea;
    } else if (point.percentPermeable > 60 && point.percentPermeable <= 80) {
      dataToShow[3] += point.shapeArea;
    } else {
      dataToShow[4] += point.shapeArea;
    }
  }

  return dataToShow;
};

let getShapeAreaTotal = function (data) {
  let shapeAreaTotal = 0;
  for (let i = 0; i < data.length; i++) {
    shapeAreaTotal += data[i];
  }
  return shapeAreaTotal;
};

let convertDataToPercent = function (data, shapeAreaTotal) {
  for (let i = 0; i < data.length; i++) {
    data[i] = (data[i] / shapeAreaTotal * 100).toFixed(2);
  }
  return data;
};

let getAveragePercent = function (data, shapeAreaTotal) {
  let shapeAreaAffected = 0;
  for (let i = 0; i < data.length; i++) {
    shapeAreaAffected += data[i].percentPermeable * data[i].shapeArea;
  }
  return (shapeAreaAffected / shapeAreaTotal).toFixed(2);
};

export function proxyMapInfo(req, res) {
  let url = req.body.url;

  request(url, function (error, response) {
    let dataToAnalyse = response.body;

    try {
      dataToAnalyse = JSON.parse(dataToAnalyse);

      let dataToSort = getDataToSort(dataToAnalyse);
      let sortedData = sortData(dataToSort);

      let shapeAreaTotal = getShapeAreaTotal(sortedData);

      let averagePercent = getAveragePercent(dataToSort, shapeAreaTotal);
      let convertedData = convertDataToPercent(sortedData, shapeAreaTotal);

      let objectToReturn = {averagePercent, percentPerSection: convertedData};

      res.send(objectToReturn);
    } catch (err) {
      res.status(500).send(err);
    }
  });
}

export function proxyTownInfo(req, res){
  let url = req.body.url;

  console.log(url);

  request(url, function (error, response) {
    res.send(response.body);
  });
}

export function downloadMapInfo(req, res) {
  let url = req.body.url;
  let polygonToClip = req.body.polygon;

  request(url, function (error, response) {

    let data = JSON.parse(response.body);
    let mapFeatures = data.features;

    let intersectionFeatures = [];
    for(let i =0; i < mapFeatures.length; i++){
      let featureCoordinates = mapFeatures[i].geometry.coordinates;
      let featurePercentImperm = mapFeatures[i].properties.percent_aa;

      let intersectionCoordinates = martinez.intersection(featureCoordinates, polygonToClip);

      //Ignore if feature does not intersect
      if(intersectionCoordinates.length == 0){
        continue;
      }

      let intersectionFeature = {
        "type": "Feature",
        "id": "intersection."+i,
        "properties": {
          "percent_aa": featurePercentImperm
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": intersectionCoordinates
        }
      };

      intersectionFeatures.push(intersectionFeature);
    }

    let intersectionFeaturesCollection = {
      "type": "FeatureCollection",
      "features": intersectionFeatures
    };

    res.send(intersectionFeaturesCollection);
  });
}

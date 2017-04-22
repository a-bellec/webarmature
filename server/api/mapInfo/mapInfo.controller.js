'use strict';

var request = require('request');

export function proxyPointInfo(req, res) {
  let url = req.body.url;

  request(url, function(error, response, body) {
    res.send(response.body);
  });
}

let getDataToSort = function(dataToAnalyse) {
  let features = dataToAnalyse.features;

  let dataToReturn = [];
  for(let i = 0; i < features.length; i++) {
    let itemToAdd = {percentPermeable: 0, shapeArea: 0};

    let percentageToCheck = features[i].properties.percent_aa;

    if(percentageToCheck >= 0 && percentageToCheck <= 100) {
      itemToAdd.percentPermeable = parseFloat(percentageToCheck.toFixed(2));
      itemToAdd.shapeArea = Math.round(features[i].properties.Shape_Area.toFixed(2));
      dataToReturn.push(itemToAdd);
    }
  }

  return dataToReturn;
};

let sortData = function(dataToSort) {
  let dataToShow = [0, 0, 0, 0, 0];
  for(let point of dataToSort) {
    if(point.percentPermeable <= 20) {
      dataToShow[0] += point.shapeArea;
    } else if(point.percentPermeable > 20 && point.percentPermeable <= 40) {
      dataToShow[1] += point.shapeArea;
    } else if(point.percentPermeable > 40 && point.percentPermeable <= 60) {
      dataToShow[2] += point.shapeArea;
    } else if(point.percentPermeable > 60 && point.percentPermeable <= 80) {
      dataToShow[3] += point.shapeArea;
    } else {
      dataToShow[4] += point.shapeArea;
    }
  }

  return dataToShow;
};

let getShapeAreaTotal = function(data) {
  let shapeAreaTotal = 0;
  for(let i = 0; i < data.length; i++) {
    shapeAreaTotal += data[i];
  }
  return shapeAreaTotal;
};

let convertDataToPercent = function(data, shapeAreaTotal) {
  for(let i = 0; i < data.length; i++) {
    data[i] = (data[i] / shapeAreaTotal * 100).toFixed(2);
  }
  return data;
};

let getAveragePercent = function(data, shapeAreaTotal) {
  let shapeAreaAffected = 0;
  for(let i = 0; i < data.length; i++) {
    shapeAreaAffected += data[i].percentPermeable * data[i].shapeArea;
  }
  return (shapeAreaAffected / shapeAreaTotal).toFixed(2);
};

export function proxyMapInfo(req, res) {
  let url = req.body.url;

  request(url, function(error, response, body) {
    let dataToAnalyse = response.body;

    try {
      dataToAnalyse = JSON.parse(dataToAnalyse);

      let dataToSort = getDataToSort(dataToAnalyse);
      let sortedData = sortData(dataToSort);

      let shapeAreaTotal = getShapeAreaTotal(sortedData);

      let averagePercent = getAveragePercent(dataToSort, shapeAreaTotal);
      let convertedData = convertDataToPercent(sortedData, shapeAreaTotal);

      let objectToReturn = { averagePercent, percentPerSection: convertedData};

      res.send(objectToReturn);
    } catch(err) {
      res.status(500).send(err);
    }
  });
}

export function proxyTownInfo(req, res) {
  let url = req.body.url;

  request(url, function(error, response, body) {
    console.log(response);
  });
}

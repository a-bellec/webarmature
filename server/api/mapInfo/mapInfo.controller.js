'use strict';

var request = require('request');

export function proxyPointInfo(req, res) {

  let url = req.body.url;

  request(url, function (error, response, body) {
    res.send(response.body);
  });

}

let getDataToSort = function(dataToAnalyse){
  let features = dataToAnalyse.features;

  let dataToReturn = [];
  for (let i = 0; i < features.length; i++) {
    let itemToAdd = {"percentPermeable": 0, "shapeArea": 0};

    let percentageToCheck = features[i].properties.percent_aa;

    if (percentageToCheck >= 0 && percentageToCheck <= 100) {
      itemToAdd["percentPermeable"] = parseFloat(percentageToCheck.toFixed(2));
      itemToAdd["shapeArea"] = Math.round(features[i].properties.Shape_Area.toFixed(2));
      dataToReturn.push(itemToAdd);
    }
  }

  return dataToReturn;
};

let sortData = function(dataToSort){
  let dataToShow = {"darkGreen": 0, "lightGreen": 0, "yellow": 0, "orange": 0, "red": 0};
  for (let point of dataToSort) {
    if (point.percentPermeable <= 20) {
      dataToShow.darkGreen += point.shapeArea;
    }
    else if (point.percentPermeable > 20 && point.percentPermeable <= 40) {
      dataToShow.lightGreen += point.shapeArea;
    }
    else if (point.percentPermeable > 40 && point.percentPermeable <= 60) {
      dataToShow.yellow += point.shapeArea;
    }
    else if (point.percentPermeable > 60 && point.percentPermeable <= 80) {
      dataToShow.orange += point.shapeArea;
    }
    else {
      dataToShow.red += point.shapeArea;
    }
  }

  return dataToShow;
};

let getShapeAreaTotal = function(data){
  let shapeAreaTotal = 0;
  for(let key in data){
    shapeAreaTotal += data[key];
  }
  return shapeAreaTotal;
};

let convertDataToPercent = function(data, shapeAreaTotal){
  for(let key in data){
    data[key] = ((data[key]/shapeAreaTotal) * 100).toFixed(2);
  }
  return data;
};

let getAveragePercent = function(data, shapeAreaTotal){
  let shapeAreaAffected = 0;
  for(let i=0; i < data.length; i++){
    shapeAreaAffected += data[i].percentPermeable * data[i].shapeArea;
  }
  return (shapeAreaAffected/shapeAreaTotal).toFixed(2);
};

export function proxyMapInfo(req, res) {
  let url = req.body.url;

  request(url, function (error, response, body) {

    let dataToAnalyse = response.body;

    try{
      dataToAnalyse = JSON.parse(dataToAnalyse);

      let dataToSort = getDataToSort(dataToAnalyse);
      let sortedData = sortData(dataToSort);

      let shapeAreaTotal = getShapeAreaTotal(sortedData);
      let averagePercent = getAveragePercent(dataToSort, shapeAreaTotal);
      
      let convertedData = convertDataToPercent(sortedData, shapeAreaTotal);
      res.send(convertedData);
    }
    catch(err){
      res.status(500).send(err);
    }

  });
}

export function proxyTownInfo(req, res) {
  let url = req.body.url;

  request(url, function (error, response, body) {
    console.log(response);
  });
}

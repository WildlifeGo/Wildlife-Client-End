'use strict';

var app = app || {};

const ENV = {};

ENV.isProduction = window.location.protocol === 'https:';
ENV.productionApiUrl = 'insert cloud API server URL here';
ENV.developmentApiUrl = 'http://localhost:3000';
ENV.apiUrl = ENV.isProduction ? ENV.productionApiUrl : ENV.developmentApiUrl;

(function (module) {
  function errorCallback(err) {
    console.error(err);
    module.errorView.initErrorPage(err);
  }

  //Array to hold all of the parks once they're constructed.
  Park.all = [];

  //Park constructor function. Might want to set this to a variable?
  function Park(name, lat, long, radius, description, index) {
    this.name = name;
    this.lat = lat;
    this.long = long;
    this.radius = radius;
    this.description = description;
    // this.animals = [];
    this.index = index;
    Park.all.push(this);
  }

  //This function will get called once a park button has been clicked on the homepage. It will query the iNaturalist API and return a raw data object that we will append to the that particular park object. Might need to pass in the Park index as well as the rawAnimals index. 

  Park.loadAnimals = function (rawAnimalObj) {

    Park.all[rawAnimalObj[0].park].animals = rawAnimalObj;

    return rawAnimalObj;
  
  };

  //Park prototype for rendering to handlebards. This might be redundant with what we have on park-view.js
  Park.parkToHtml = function (obj) {
    console.log(obj);
    let template = Handlebars.compile($('#park-details-template').text());
    console.log(template(obj));
    return template(obj);
  };

  //Create instances for each park. Might not need to set to variables since they're being stored in Park.all anyway.
  //TODO: Fill in park descriptions. 
  new Park('Discovery Park', 47.661817, -122.417857, 1, '', 0);
  new Park('Washington Park Arboretum', 47.635974, -122.294531, 1, '', 1);
  new Park('Interlaken Park', 47.636529, -122.309307, 0.5, '', 2);
  new Park('Ravenna Park', 47.671953, -122.307066, 0.5, '', 3);
  new Park('Magnuson Park', 47.679826, -122.253915, 0.5, '', 4);

  //Callback will be parkView.initSelectedParkPage. Does the response from get automatically get passed into the .then (Park.loadAnimals)? Does the result from the Park.loadAnimals get passed  as an argument to the .then(callback)? Also, might want to pass park id/index into the Park.loadAnimals function. I think we might need to get this from the path endpoint?
  Park.fetch = (park, callback) => {

    console.log('fetch called');
    console.log(ENV.apiUrl);

    $.get(`${ENV.apiUrl}/api/v1/parks/find`, park)
    .then(Park.loadAnimals)
    .then(callback)
    .catch(errorCallback);
  };

  module.Park = Park;

})(app);
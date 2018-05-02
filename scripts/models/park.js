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
  // Park.userParkInput = '';
  Park.test = function(){
    console.log('in park test');
  }
  //Park constructor function. Might want to set this to a variable?
  function Park(name, lat, long, radius, description) {
    this.name = name;
    this.lat = lat;
    this.long = long;
    this.radius = radius;
    this.description = description;
    this.animals = [];
    Park.all.push(this);
  }

  //This function will get called once a park button has been clicked on the homepage. It will query the iNaturalist API and return a raw data object that we will append to the that particular park object. Might need to pass in the Park index as well as the rawAnimals index.
  Park.prototype.loadAnimals = function (rawAnimalObj) {
    this.animals = Object.keys(rawAnimalObj).forEach(key => this[key] = rawAnimalObj[key]);
  };

  //Park prototype for rendering to handlebards. This might be redundant with what we have on park-view.js
  Park.prototype.toHtml = function () {
    let template = Handlebars.compile($('#park-list-template').text());
    return template(this);
  };

  //Create instances for each park. Might not need to set to variables since they're being stored in Park.all anyway.
  //TODO: Fill in park descriptions.
  new Park('Discovery Park', 47.661817, -122.417857, 1, '');
  new Park('Washington Park Arboretum', 47.635974, -122.294531, 1, '');
  new Park('Interlaken Park', 47.636529, -122.309307, 0.5, '');
  new Park('Ravenna Park', 47.671953, -122.307066, 0.5, '');
  new Park('Magnuson Park', 47.679826, -122.253915, 0.5, '');

  //Callback will be parkView.initSelectedParkPage. Does the response from get automatically get passed into the .then (Park.loadAnimals)? Does the result from the Park.loadAnimals get passed  as an argument to the .then(callback)? Also, might want to pass park id/index into the Park.loadAnimals function. I think we might need to get this from the path endpoint?
  Park.fetch = (park, callback) =>
    $.get(`${ENV.apiUrl}/api/v1/parks/find`, park)
    .then(Park.loadAnimals)
    .then(callback)
    .catch(errorCallback);

    // ajax call to server to with location for query
  Park.getLocation = (location) => {
    console.log('getLocation fired');
    $.get(`${ENV.apiUrl}/api/v1/map_test/${location}`);
  }

  module.Park = Park;

})(app);

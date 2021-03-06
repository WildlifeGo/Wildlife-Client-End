'use strict';

var app = app || {};

const ENV = {};

ENV.isProduction = window.location.protocol === 'https:';
ENV.productionApiUrl = 'https://wildlife-sightings.herokuapp.com';
ENV.developmentApiUrl = 'http://localhost:3000';
ENV.apiUrl = ENV.isProduction ? ENV.productionApiUrl : ENV.developmentApiUrl;


(function (module) {
  function errorCallback(err) {
    console.error(err);
    module.errorView.initErrorPage(err);
  }

  const locationForm = document.getElementById('location-form');

  let googleData = [];

  let handleUserLocation = (event) => {
    $('#choose-text').css('display', 'block');
    $('#location-form').css('display', 'none');
    event.preventDefault();
    let userInput = document.getElementById('user-input').value;
    $.get(`${ENV.apiUrl}/api/v1/parks/googlemaps/:${userInput}`)
      .then(Park.handleGoogle)
      .catch(errorCallback);
  };

  Park.handleGoogle = (data) => {
    googleData.push(data);
    
    new Park(googleData[0][0], googleData[0][1].lat, googleData[0][1].lng, 10, 'Google location', 'http://www.seattleandsound.com/images/magnusonpark290.jpg', 5);
    let selectedPark = Park.all[5];

    Park.fetch(selectedPark, app.parkView.initSelectedParkPage);

  };

  locationForm.addEventListener('submit', handleUserLocation);

  Park.all = [];

  function Park(name, lat, long, radius, description, image_url, index) {
    this.name = name;
    this.lat = lat;
    this.long = long;
    this.radius = radius;
    this.description = description;
    this.image_url = image_url;
    this.index = index;
    Park.all.push(this);
  }

  Park.loadAnimals = function (rawAnimalObj) {
    Park.all[rawAnimalObj[0].park].animals = rawAnimalObj;
    return rawAnimalObj;
  };

  Park.parkToHtml = function (obj) {
    let template = Handlebars.compile($('#park-details-template').text());
    return template(obj);
  };

  new Park('Discovery Park', 47.661817, -122.417857, 1, 'Discovery Park is a 534 acre natural area park operated by the Seattle Parks and Recreation. It is the largest city park in Seattle and one of breathtaking majesty.', 'https://www.seattle.gov/images/Departments/ParksAndRecreation/Parks/DEF/DiscoveryPark5.jpg', 0);
  new Park('Washington Park Arboretum', 47.635974, -122.294531, 1, 'The Arboretum is a hidden gem on the shores of Lake Washington. Its 230 acres contain a dynamic assortment of plants, some found nowhere else in the Northwest.', 'https://statesymbolsusa.org/sites/statesymbolsusa.org/files/Washington-arboretum-2.jpg', 1);
  new Park('Interlaken Park', 47.636529, -122.309307, 1, 'Interlaken Park is a densely wooded area on the north end of Capitol Hill. The paths and trails throughout the park are frequented by bikers, hikers and joggers.', 'https://www.seattle.gov/images/Departments/ParksAndRecreation/Parks/GHI/InterlakenPark2.jpg', 2);
  new Park('Ravenna Park', 47.671953, -122.307066, 1, 'Ravenna Park is a ½ mile wooded ravine which connects two picnic areas just north of the University District, and is a popular spot for hiking, jogging and picnics.', 'https://media-cdn.tripadvisor.com/media/photo-s/07/74/c9/03/ravenna-park.jpg', 3);
  new Park('Magnuson Park', 47.679826, -122.253915, 1, 'At Magnuson Park, you\'ll find more than four miles of walking trails along the shores of Lake Washington, grassy fields, evergreen and deciduous trees and brush, and captivating public art installations.', 'http://www.seattleandsound.com/images/magnusonpark290.jpg', 4);

  Park.fetch = (park, callback) => {
    $.get(`${ENV.apiUrl}/api/v1/parks/find`, park)
      .then(Park.loadAnimals)
      .then(callback)
      .catch(errorCallback);
  };

  Park.sendResults = (animals, userName, callback) => {
    $.ajax({
      url: `${ENV.apiUrl}/api/v1/parks/submit`,
      method: 'PUT',
      data: {animals, userName},
    })
      .then(callback)
      .catch(errorCallback);
  };
  module.Park = Park;
})(app);

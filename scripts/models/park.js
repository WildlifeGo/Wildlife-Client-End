'use strict';

var app = app || {};

const ENV = {};

ENV.isProduction = window.location.protocol === 'https:';
ENV.productionApiUrl = 'insert cloud API server URL here';
ENV.developmentApiUrl = 'http://localhost:3000';
ENV.apiUrl = ENV.isProduction ? ENV.productionApiUrl : ENV.developmentApiUrl;

(function(module) {

  $('.login-form').on('submit', (event) => {
    event.preventDefault();
    console.log(event.target);

    let username = $('input[name="username"]').val();
    let password = $('input[name="password"]').val();

    console.log(username, password);

    if (username === 'user' && password === '1234'){

      console.log('hitting if statement');
      
      $('form').addClass('hide');
      $('.sign-out-button').removeAttr('hidden');
      //call said function here
    }  
  });

  $('.sign-out-button').on('click', (event) => {
    
    console.log(event.target);
    $('form').removeClass('hide');
    $('.sign-out-button').prop('hidden', true);
    $('form')[0].reset();
  });

  username.fetch = (username, callback) => {

    $.get(`${ENV.apiUrl}/api/v1/sign-in`)
    
  }

  module.login = login;
  
})(app);


(function (module) {
  function errorCallback(err) {
    console.error(err);
    module.errorView.initErrorPage(err);
  }

  //Array to hold all of the parks once they're constructed.
  Park.all = [];

  //Park constructor function. Might want to set this to a variable?
  function Park(name, lat, long, radius, description, image_url, index) {
    this.name = name;
    this.lat = lat;
    this.long = long;
    this.radius = radius;
    this.description = description;
    this.image_url = image_url;
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
  new Park('Discovery Park', 47.661817, -122.417857, 1, 'Discovery Park is a 534 acre natural area park operated by the Seattle Parks and Recreation. It is the largest city park in Seattle, and occupies most of the former Fort Lawton site. The site is one of breathtaking majesty. Situated on Magnolia Bluff overlooking Puget Sound, Discovery Park offers spectacular view of both the Cascade and the Olympic Mountain ranges. The secluded site includes two miles of protected tidal beaches as well as open meadow lands, dramatic sea cliffs, forest groves, active sand dunes, thickets and streams.', 'https://www.seattle.gov/images/Departments/ParksAndRecreation/Parks/DEF/DiscoveryPark5.jpg', 0);
  new Park('Washington Park Arboretum', 47.635974, -122.294531, 1, 'The Arboretum is a hidden gem on the shores of Lake Washington. Jointly managed by the University of Washington Botanic Gardens and the City of Seattle, its 230 acres contain a dynamic assortment of plants, some found nowhere else in the Northwest. Take a walk through the Arboretum and discover this beautiful living collection.', 'https://statesymbolsusa.org/sites/statesymbolsusa.org/files/Washington-arboretum-2.jpg', 1);
  new Park('Interlaken Park', 47.636529, -122.309307, 0.5, 'Interlaken Park is a densely wooded area on the north end of Capitol Hill. The paths and trails throughout the park are frequented by bikers, hikers and joggers.', 'https://www.seattle.gov/images/Departments/ParksAndRecreation/Parks/GHI/InterlakenPark2.jpg', 2);
  new Park('Ravenna Park', 47.671953, -122.307066, 0.5, 'Ravenna Park is a ½ mile wooded ravine which connects two picnic areas just north of the University District, and is a popular spot for hiking, jogging and picnics. Park features include a play area for children, a wading pool, ballfield, trails, and tennis courts.', 'https://media-cdn.tripadvisor.com/media/photo-s/07/74/c9/03/ravenna-park.jpg', 3);
  new Park('Magnuson Park', 47.679826, -122.253915, 0.5, 'At Magnuson Park, you\'ll find more than four miles of walking trails along the shores of Lake Washington, grassy fields, evergreen and deciduous trees and brush, and captivating public art installations. The park\'s "historic district" features more than 20 brick and metal structures built in the 1930s and 1940s. Formerly a military base, Magnuson Park has many landmarks and historical sites that prominently display Art Deco style architecture. Magnuson also has a huge variety of amenities and features such as sports fields, community garden, wetland habitat, trails, boat launch, community center, swimming beach, and more!', 'http://www.seattleandsound.com/images/magnusonpark290.jpg', 4);

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

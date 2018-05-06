'use strict';

var app = app || {};

(function (module) {

  function resetView() {
    $('.sec-container').hide();
    $('.nav-menu').slideUp(350);
  }

  const parkView = {};

  parkView.initHomePage = function (callback) {
    resetView();
    $('.park-view').show();
    $('.park-list').show();
    $('.about-us').hide();
    $('.login-form').css("display", "none");
    $('.parallax').show();
    $('#title').css("display", "block");

    app.userView.initLogin();

    console.log(localStorage.logToken)

    if(localStorage.logToken){
      $('.login').css("display", "none");
      $('.logout').css("display", "block");
    }
    else{
      $('.login').css("display", "block");
      $('.logout').css("display", "none");
    }
    console.log(callback)
    if(callback){
      
      $('.parallax').show();
      $('.sign-out-button').css("display", "none");
      $('.login').css("display", "none");
      $('.logout').css("display", "block");
      $('#title').css("display", "none");
      $('.login-form').css("display", "block");
      window.scrollTo( 0, 0 );
    }

    $('.parks').on('click', function (event) {

      event.preventDefault();

      let selectedParkIndex = event.target.id;

      let selectedPark = module.Park.all[selectedParkIndex];

      module.Park.fetch(selectedPark, parkView.initSelectedParkPage);

    });
  };

  $('#choose-text').on('click', function () {
    console.log('clicked');
    $('#choose-text').css("display", "none");
    $('#location-form').css("display", "block");
  });

  $('.login').on('click', function () {
    console.log('clicked');
    $('.sign-out-button').css("display", "none");
    
    $('#title').css("display", "none");
    $('.login-form').css("display", "block");
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });


  });

  $('.logout').on('click', function () {
    console.log('clicked');
    localStorage.clear();
    $('.login').css("display", "block");
    $('.logout').css("display", "none");
    $('#title').css("display", "block");
    $('.login-form').css("display", "none");
    var logToken = false;
    localStorage.setItem('logToken', logToken);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    document.getElementById('username').value = '';
    document.getElementById('user-pword').value = '';
  });

  $('.home').on('click', function () {
    parkView.initHomePage();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  $('.about').on('click', function(event) {
    $('.park-view').hide();
    $('.park-list').hide();
    $('.login-form').hide();
    $('.about-us').show();
    $('#title').css("display", "none");
  });

  $('#arrow').on('click', function () {
    
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  });

   parkView.initSelectedParkPage = function (animals) {
    resetView();
    $('.park-detail').empty();
    $('.animal-list').empty();
    $('.home').css("border", "none");
    $('.parallax').hide();
    $('.park-details').show();
    window.scrollTo( 0, 0 );
    let currPark = animals[0].park;

    let source = module.Park.parkToHtml(app.Park.all[currPark]);
    console.log(source);
    $('.park-detail').append(source);

    let allAnimalsAsString = localStorage.getItem(module.Park.all[currPark].name);
    let retrievedAnimals = JSON.parse(allAnimalsAsString);
    // console.log (retrievedAnimals);
    if (retrievedAnimals && retrievedAnimals.length) {
      for (var i in animals) {
        animals[i] = retrievedAnimals[i];

      }
      console.log('retrieved from LS: ', animals);
    }
    let allAnimalsLoaded = []
    module.Park.all[currPark].animals.forEach(animal => {
      console.log(animal);
      let template = Handlebars.compile($('#animal-list-template').text());
      $('.animal-list').append(template(animal));

     console.log(animal.index);

      $(`#${animal.index}`).mouseover(function() {
        $(`#${animal.index}`).css("background", "rgb(255,255,255,0.9)");
        $(`#${animal.index}`).css("cursor", "pointer");
      });

      $(`#${animal.index}`).mouseout(function() {
        $(`#${animal.index}`).css("background", "rgb(255,255,255,0.6)");
      });

      $(`#${animal.index}`).on('click', (function() {
        
        $(`#${animal.index}`).css("background", "rgb(135,206,250,0.9)");
        $(`#${animal.index}`).off();
      }));

    
    

      allAnimalsLoaded.push(animal);

    }
  

  
  );

    let saveAnimal = JSON.stringify(allAnimalsLoaded);
    console.log('object sent to local storage: ' + saveAnimal);
    console.log(module.Park.all[currPark].name);
    localStorage.setItem(module.Park.all[currPark].name, saveAnimal);

    let animalsSeen = [];

    $('.animal-list').on('click', function (event) {
      event.preventDefault();
      let clicked = event.target;
      let clickedName = $(clicked).parent().attr('value');
      console.log(clickedName);
      animalsSeen.push(clickedName.toLowerCase());
      console.log(animalsSeen);
    });



    $('#submit-button').on('click', function (event) {
      event.preventDefault();
      if(localStorage.logToken===false || !localStorage || !localStorage.logToken)
      {
        console.log('not logged in!');
        let notLoggedIn=true;
        parkView.initHomePage(notLoggedIn);
      }
      else{
      
      app.Park.sendResults(animalsSeen, localStorage.userName, parkView.initResultsPage);
      }
    });
  };

  parkView.initResultsPage = function (results) {
    resetView();
    window.scrollTo( 0, 0 );
    $('.park-view').hide();
    $('.park-list').hide();
    $('.about-us').hide();
    $('.login-form').css("display", "none");
    $('.parallax').show();
    $('#title').css("display", "none");
    $('.animal-results').show();

    console.log(results);

    results.forEach(userResults => {
      console.log(userResults);
      let obj = {};
      obj.prop = userResults;
      console.log(userResults);
      let template = Handlebars.compile($('#animal-results-template').text());
      $('.animal-results').append(template(obj));
    });
  };

  module.parkView = parkView;

})(app);

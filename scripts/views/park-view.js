// 'use strict';

// var app = app || {};

// (function(module) {

//   //Kept this code in case we use a similar nav dropdown to the books lab.
//   $('.icon-menu').on('click', function(event) {
//     $('.nav-menu').slideToggle(350);
//   });

//   //Hides nav dropdown when something is clicked on.
//   function resetView() {
//     $('.sec-container').hide();
//     $('.nav-menu').slideUp(350);
//   }

//   //Object to hold all our initPage functions.
//   const parkView = {};

//   //Init home page. Will show section with class of park and add click listeners to each list item (with class parks (plural)).
//   parkView.initHomePage = function() {
//     resetView();
//     $('.park-view').show();

//     app.userView.initLogin(); // add login functionality

//     $('.parks').on('click', function(event) {

//       event.preventDefault();

//       //List items for each park on index page have numerical id's that act like indices.
//       let selectedParkIndex = event.target.id;
//       // console.log(selectedParkIndex);

//       //Grab the selected park's object from the master Park object (on)
//       let selectedPark = module.Park.all[selectedParkIndex];
//       // console.log(selectedPark);

//       module.Park.fetch(selectedPark, parkView.initSelectedParkPage);

//       //Should we use the page js call here? Or is this already being done in the function directly above.

//     });
//   };

//   //TODO: This is where I have the most work to do. How to properly append to html. Right now we have two handlebar things being compiled. One for park, one for animals. Probably just need one. See note below.
//   parkView.initSelectedParkPage = function(animals) {
//     resetView();
//     $('.park-details').show();
//     // $('#search-list').empty(); //what do we need to empty here? Maybe delete.
//     let currPark = animals[0].park;

//     //We need to pass the whole Park object (for that particular park) into the template. We can either hardcode the animal cards into the html-side template. Or loop through with a foreach similar to the next line of code. Looping would be better if we ever want the user to select the number of animals displayed. In this case, would it be a template within a template?
//     let source = module.Park.parkToHtml(app.Park.all[currPark]);
//     console.log(source);
//     $('.park-detail').append(source);

//     module.Park.all[currPark].animals.forEach(animal=> {
//       console.log(animal);
//       let template = Handlebars.compile($('#animal-list-template').text());
//       $('.animal-list').append(template(animal));

//     }
//     );
//   };

//   module.parkView = parkView;

// })(app);

'use strict';

var app = app || {};

(function(module) {

  //Kept this code in case we use a similar nav dropdown to the books lab.
  $('.icon-menu').on('click', function(event) {
    $('.nav-menu').slideToggle(350);
  })

  //Hides nav dropdown when something is clicked on.
  function resetView() {
    $('.sec-container').hide();
    $('.nav-menu').slideUp(350);
  }

  //Object to hold all our initPage functions.
  const parkView = {};

  //Init home page. Will show section with class of park and add click listeners to each list item (with class parks (plural)).
  parkView.initHomePage = function() {

    app.userView.initLogin();
    resetView();
    $('.park-view').show();
    $('.park-list').show();
    $('.parks').on('click', function(event) {
    
      event.preventDefault();

      //List items for each park on index page have numerical id's that act like indices.
      let selectedParkIndex = event.target.id;
      // console.log(selectedParkIndex);

      //Grab the selected park's object from the master Park object (on)
      let selectedPark = module.Park.all[selectedParkIndex];
      // console.log(selectedPark);

      module.Park.fetch(selectedPark, parkView.initSelectedParkPage);

      //Should we use the page js call here? Or is this already being done in the function directly above.

    });
  };

  //TODO: This is where I have the most work to do. How to properly append to html. Right now we have two handlebar things being compiled. One for park, one for animals. Probably just need one. See note below.
  parkView.initSelectedParkPage = function(animals) {
    resetView();
    $('.park-details').show();
    // $('#search-list').empty(); //what do we need to empty here? Maybe delete.
    let currPark = animals[0].park;

    //We need to pass the whole Park object (for that particular park) into the template. We can either hardcode the animal cards into the html-side template. Or loop through with a foreach similar to the next line of code. Looping would be better if we ever want the user to select the number of animals displayed. In this case, would it be a template within a template?
    let source = module.Park.parkToHtml(app.Park.all[currPark]);
    console.log(source);
    $('.park-detail').append(source);

    module.Park.all[currPark].animals.forEach(animal=> {
      console.log(animal);
      let template = Handlebars.compile($('#animal-list-template').text());
      $('.animal-list').append(template(animal));
    }
    );

    let animalsSeen = [];

      $(".animal-list").on('click', function(event) {
        event.preventDefault();
        let clicked = event.target;
        let clickedName = $(clicked).parent().attr('id');
        console.log(clickedName);
        animalsSeen.push(clickedName.toLowerCase());
        console.log(animalsSeen);
      })

  

      $("#button").on('click', function(event) {
        event.preventDefault();
        console.log(event.target);
        //if logged in: send info in animalsSeen array
        //else send to log in page
        app.Park.sendResults(animalsSeen, parkView.initResultsPage);

      } )
  };

  parkView.initResultsPage = function(results) {
    resetView();
    $('.animal-results').show();
    
    results.forEach(userResults=> {
      console.log(userResults);
      let template = Handlebars.compile($('.animal-results').text());
      $('.animal-results').append(template(userResults));
    })
  }

  module.parkView = parkView;

})(app);

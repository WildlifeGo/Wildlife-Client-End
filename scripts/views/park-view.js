'use strict';

var app = app || {};

(function(module) {

  //Kept this code in case we use a similar nav dropdown to the books lab.
  $('.icon-menu').on('click', function(event) {
    $('.nav-menu').slideToggle(350);
  })

  //Hides nav dropdown when something is clicked on.
  function resetView() {
    $('.container').hide();
    $('.nav-menu').slideUp(350);
  }

  //Object to hold all our initPage functions.
  const parkView = {};

  //Init home page. Will show section with class of park and add click listeners to each list item (with class parks (plural)).
  parkView.initHomePage = function() {
    resetView();
    $('.park-view').show();
    $('.parks').on('click', function(event) {
    
      event.preventDefault();

      //List items for each park on index page have numerical id's that act like indices.
      let selectedParkIndex = event.target.id;

      //Grab the selected park's object from the master Park object (on)
      let selectedPark = module.Park.all[selectedParkIndex];


      module.Park.fetch(selectedPark, parkView.initSelectedParkPage);

      //Should we use the page js call here? Or is this already being done in the function directly above.

    });
  };

  //TODO: This is where I have the most work to do. How to properly append to html. Right now we have two handlebar things being compiled. One for park, one for animals. Probably just need one. See note below.
  parkView.initSelectedParkPage = function(parkIndex) {
    resetView();
    $('.park-details').show();
    $('#search-list').empty(); //what do we need to empty here? Maybe delete.
    let currPark = parkIndex;

    //We need to pass the whole Park object (for that particular park) into the template. We can either hardcode the animal cards into the html-side template. Or loop through with a foreach similar to the next line of code. Looping would be better if we ever want the user to select the number of animals displayed. In this case, would it be a template within a template?
    module.Park[currPark].animals.forEach(animal=> $('#book-list').append(animal.toHtml()));

    let template = Handlebars.compile($('#book-detail-template').text());
    $('.book-detail').append(template(ctx.book));

  };

  module.parkView = parkView;

})(app);


'use strict';
var app = app || {};
//
// (function(module) {
//   const locInput = {};
//
//   locInput.handleUserLocation = () => {
//     console.log($('#user-location').val());
//     $('.custom-location').on('submit', function(event) {
//       console.log('anything');
//         event.preventDefault();
//       let location = $('#user-location').val();
//          console.log('location', location);
//          app.Park.getLocation(location);
//       });
//   }
//   module.locInput = locInput;
// })(app)

$(document).ready(() => {
  $('.custom-location').on('submit', function(event) {
          event.preventDefault();
           let location = $('#user-location').val();
           console.log(location);
           // module.Park.getLocation(location);
        });
  $('.login-button').on('click', () => {
    $('.login-form').toggle();
    $('.login-button').toggleClass('button-active');
  });

  $('.menu-button').on('click', () => {
    $('.menu-button').toggleClass('button-active');
    $('.nav-menu').toggleClass('hide');
  });
});

'use strict';

var app = app || {};


(function (module) {

  const userView = {};

  userView.initLogin = () => {
    $('.login-form').on('submit', (event) => {
      event.preventDefault();
      // console.log(event.target);
      let user = {
        username: $('input[name="username"]').val(),
        password: $('input[name="password"]').val()
      };
      
      app.User.create(user, userView.signOut);
      $('form').addClass('hide');
      $('.sign-out-button').removeAttr('hidden');

      //set up token variable to true here and put in local storage
    });
  };

  userView.signOut = () => {

    $('.sign-out-button').on('click', (event) => {
      $('form').removeClass('hide');
      $('.sign-out-button').prop('hidden', true);
      $('form')[0].reset();
      // remove localstorage, localstorage.clear(), set boolean to false
    });
  };

  module.userView = userView;
})(app);

// $(document).ready(function() {





// });


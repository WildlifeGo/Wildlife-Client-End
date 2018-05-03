'use strict';

var app = app || {};


(function (module) {

  const userView = {};

  userView.initLogin = () => {
    $('.login-form').on('submit', (event) => {
      event.preventDefault();

      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
      // console.log(event.target);
      let user = {
        username: $('input[name="username"]').val(),
        password: $('input[name="password"]').val()
      };
      // window.scrollTo(0,document.body.scrollHeight);

      

      $('#title').css("display", "block");
      $('.login-form').css("display", "none");
      
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
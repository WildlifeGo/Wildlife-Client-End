'use strict';

var app = app || {};


(function (module) {
  const user = {};

  app.initCreateUser = function() {

    $('#login-form').on('submit', function(event) {
      event.preventDefault();

      let user = {
        tusername: event.target.username.value,
        password: event.target.password.value

      };

      module.User.create(user);
    });
  };

  // adminView.initAdminPage = function (ctx, next) {
  //   $('.nav-menu').slideUp(350);
  //   $('.admin-view').show();

  //   $('#admin-form').on('submit', function(event) {
  //     event.preventDefault();
  //     let token = event.target.passphrase.value;

  //     // COMMENT: Is the token cleared out of local storage? Do you agree or disagree with this structure?
  //     //The token is not cleared out of local storage. This structure is pretty dumb. We changed it so it actually checks the true/false status of the response.
  //     $.get(`${ENV.apiUrl}/api/v1/admin`, {token})
  //       .then(res => {
  //         localStorage.token = res;
  //         page('/');
  //       })
  //       .catch(() => page('/'));
  //   })
  // };

  // adminView.verify = function(ctx, next) {
  //   console.log(localStorage.token);
    
  //   if(!localStorage.token) $('.admin').addClass('admin-only');
  //   else $('.admin').show();
  //   next();
  // };

  module.userLogin = userLogin;
})(app)

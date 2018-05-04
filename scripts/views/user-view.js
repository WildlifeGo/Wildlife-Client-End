'use strict';

var app = app || {};


(function (module) {

  const userView = {};
  let userNameDB = [];
  userView.initLogin = () => {
    $('.login-form').on('submit', (event) => {
      event.preventDefault();
      let user = {
        username: $('input[name="username"]').val(),
        password: $('input[name="password"]').val()
      };

      $
        .get(`${ENV.apiUrl}/api/v1/load_user`)
        .then(testVar => {
          for (var i = 0; i < testVar.length; i++) {
            if (testVar[i].username === user.username) {
              if (testVar[i].password === user.password) {
                console.log('right password');
                userView.loggingIn();
                break
              } else {
                console.log('wrong password');
                $('form')[0].reset();
                break
              }
            } else {
              app.User.create(user, userView.signOut);
            }
          }
        });



      userView.loggingIn = () => {
        $('form').addClass('hide');
        $('.sign-out-button').removeAttr('hidden');
      }
    });
  };

  userView.signOut = () => {

    $('.sign-out-button').on('click', (event) => {
      $('form').removeClass('hide');
      $('.sign-out-button').prop('hidden', true);
      document.getElementById('username-input').value='';
      $('form')[0].reset();
      // remove localstorage, localstorage.clear(), set boolean to false
    });
  };

  module.userView = userView;
})(app);

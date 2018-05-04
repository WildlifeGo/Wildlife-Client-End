'use strict';

var app = app || {};


(function (module) {

  const userView = {};
  let userNameDB = [];
  var logToken = false;
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
            //cutest line in the file:
            let arrIndex = (testVar.map(function(e){return e.username;}).indexOf(`${user.username}`));
            console.log(arrIndex);
            if (arrIndex === -1) {
              console.log('new user');
              app.User.create(user, userView.signOut);
              logToken = true;
            } else if (user.password === testVar[arrIndex].password)  {
              console.log('valid password');
              logToken = true;
              userView.loggingIn();
            } else {
              console.log('invalid password');
            }
          });

      userView.loggingIn = () => {
        $('form').addClass('hide');
        $('.sign-out-button').removeAttr('hidden');
      }
    });
  };

    $('.sign-out-button').on('click', (event) => {
      console.log('clicked');
      logToken = false;
      $('form').removeClass('hide');
      $('.sign-out-button').prop('hidden', true);
      $('form')[0].reset();
      // remove localstorage, localstorage.clear(), set boolean to false
      document.getElementById('username').value='';
      document.getElementById('user-pword').value='';
    });


  module.userView = userView;
})(app);

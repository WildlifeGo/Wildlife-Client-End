'use strict';

var app = app || {};


(function (module) {
  const userView = {};
  var logToken = false;

  userView.initLogin = () => {
    $('.login-form').on('submit', (event) => {
      event.preventDefault();

      let user = {
        username: $('input[name="username"]').val(),
        password: $('input[name="password"]').val()
      };
      localStorage.setItem('userName', user.username);

      $.get(`${ENV.apiUrl}/api/v1/load_user`)
        .then(testVar => {
          let arrIndex = (testVar.map(function (e) {
            return e.username;
          }).indexOf(`${user.username}`));
          console.log(arrIndex);
          if (arrIndex === -1) {
            $('#incorrect').css("visibility", "hidden");
            console.log('new user');
            app.User.create(user, userView.signOut);
            logToken = true;
            $('.login').css("display", "none");
            $('.logout').css("display", "block");
          } else if (user.password === testVar[arrIndex].password) {
            $('#incorrect').css("visibility", "hidden");
            console.log('valid password');
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: 'smooth'
            });
            $('.login').css("display", "none");
            $('.logout').css("display", "block");
            $('#title').css("display", "block");
            $('.login-form').css("display", "none");
            logToken = true;
            localStorage.setItem('logToken', logToken);
            userView.loggingIn();
          } else {
            $('#incorrect').css("visibility", "visible");
          }
        });

 
    });
  };

  userView.signOut = () => {
    $('.sign-out-button').on('click', (event) => {
      $('form').removeClass('hide');
      $('.sign-out-button').prop('hidden', true);
      $('form')[0].reset();
    });
  };

  $('.sign-out-button').on('click', (event) => {
    logToken = false;
    $('form').removeClass('hide');
    $('.sign-out-button').prop('hidden', true);
    $('form')[0].reset();
    document.getElementById('username').value = '';
    document.getElementById('user-pword').value = '';
  });

  module.userView = userView;
})(app);

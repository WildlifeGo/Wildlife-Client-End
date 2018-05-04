'use strict';

var app = app || {};


(function (module) {

  const userView = {};
  var logToken = false;

  userView.initLogin = () => {
    $('.login-form').on('submit', (event) => {
      event.preventDefault();

      console.log('sdsf')


      // console.log(event.target);
      let user = {
        username: $('input[name="username"]').val(),
        password: $('input[name="password"]').val()
      };
      // window.scrollTo(0,document.body.scrollHeight);
      localStorage.setItem('userName', user.username);

      $
        .get(`${ENV.apiUrl}/api/v1/load_user`)
        .then(testVar => {
          //cutest line in the project:
          let arrIndex = (testVar.map(function (e) {
            return e.username;
          }).indexOf(`${user.username}`));
          console.log(arrIndex);
          if (arrIndex === -1) {
            console.log('new user');
            app.User.create(user, userView.signOut);
            logToken = true;
          } else if (user.password === testVar[arrIndex].password) {
            console.log('valid password');
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: 'smooth'
            });
            
            $('#title').css("display", "block");
            $('.login-form').css("display", "none");
            logToken = true;
            localStorage.setItem('logToken', logToken);
            userView.loggingIn();
          } else {
            console.log('invalid password');
          }
        });

      // userView.loggingIn = () => {
      //   $('form').addClass('hide');
      //   $('.sign-out-button').removeAttr('hidden');
      // }





      // app.User.create(user, userView.signOut);
      // $('form').addClass('hide');
      // $('.sign-out-button').removeAttr('hidden');

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

  $('.sign-out-button').on('click', (event) => {
    console.log('clicked');
    logToken = false;
    $('form').removeClass('hide');
    $('.sign-out-button').prop('hidden', true);
    $('form')[0].reset();
    // remove localstorage, localstorage.clear(), set boolean to false
    document.getElementById('username').value = '';
    document.getElementById('user-pword').value = '';
  });

  module.userView = userView;
})(app);
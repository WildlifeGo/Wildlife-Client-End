'use strict';

var app = app || {};

const KTM = {};

KTM.isProduction = window.location.protocol === 'https:';
KTM.productionApiUrl = 'insert cloud API server URL here';
KTM.developmentApiUrl = 'http://localhost:3000';
KTM.apiUrl = KTM.isProduction ? KTM.productionApiUrl : KTM.developmentApiUrl;

(function(module) {

  function errorCallback(err) {
    console.error(err);
    module.errorView.initErrorPage(err);
  }

  function User(userObj){

    Object.keys(userObj).forEach(key => this[key] = userObj[key]);
  }

  User.create = (user, callback) =>
    $.post(`${KTM.apiUrl}/api/v1/signin`, user)
      .then(callback)
      .catch(errorCallback);

  module.User = User;

})(app);
FamilySearch = {};

// Request Foursquare credentials for the user
// @param options {optional}
// @param credentialRequestCompleteCallback {Function} Callback function to call on
//   completion. Takes one argument, credentialToken on success, or Error on
//   error.
FamilySearch.requestCredential = function (options, credentialRequestCompleteCallback) {
  // support both (options, callback) and (callback).
  if (!credentialRequestCompleteCallback && typeof options === 'function') {
    credentialRequestCompleteCallback = options;
    options = {};
  }

  var config = ServiceConfiguration.configurations.findOne({service: 'familysearch'});
  if (!config) {
    credentialRequestCompleteCallback && credentialRequestCompleteCallback(new ServiceConfiguration.ConfigError("Service not configured"));
    return;
  }
  var credentialToken = Random.id();

  var loginUrl =
        'https://ident.familysearch.org/cis-web/oauth2/v3/authorization' +
        '?client_id=' + config.clientId +
        '&response_type=code' +
        '&redirect_uri=' + Meteor.absoluteUrl('_oauth/foursquare?close') +
        '&state=' + credentialToken;

  Oauth.initiateLogin(credentialToken, loginUrl, credentialRequestCompleteCallback,
                                {width: 900, height: 450});
};

Accounts.oauth.registerService('familysearch');

if (Meteor.isClient) {
  Meteor.loginWithFamilySearch = function(options, callback) {
    // support a callback without options
    if (! callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
    FamilySearch.requestCredential(options, credentialRequestCompleteCallback);
  };
} else {
  Accounts.addAutopublishFields({
    forLoggedInUser: ['services.familysearch'],
    forOtherUsers: ['services.familysearch.id']
  });
}

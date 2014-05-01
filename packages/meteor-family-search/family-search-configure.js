Template.configureLoginServiceDialogForFamilySearch.siteUrl = function () {
  return Meteor.absoluteUrl();
};

Template.configureLoginServiceDialogForFamilySearch.fields = function () {
  return [
    {property: 'clientId', label: 'Client ID'},
    {property: 'secret', label: 'Client Secret'}
  ];
};

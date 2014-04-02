var getMyAncestors = function (pid, levels) {

    FamilySearch.getAccessToken().then(function (response) {
        FamilySearch.getCurrentUser().then(function (response) {
            user = response.getUser();
            console.log(user);
        });

        if (levels > 0) {
            FamilySearch.getParents(pid).then(function (response) {
                var relationships = response.getChildAndParentsRelationships();
                rel = relationships[0]
                var child = response.getPerson(rel.$getChildId())
                People.insert(child.display)
                var father = response.getPerson(rel.$getFatherId())
                People.insert(father.display)
                var mother = response.getPerson(rel.$getMotherId())
                People.insert(mother.display)
                
                getMyAncestors(father.id, --levels);
                getMyAncestors(mother.id, --levels);
            });           
        }
    });
}

Meteor.startup(function () {
  // code to run on server at startup
  FamilySearch.init({
    app_key: '19ZF-9HZ8-T8WW-XS9P-1Z3W-JHK4-DLJV-CSMN',
    environment: 'production',
    auth_callback: 'http://genny-99003.usw1-2.nitrousbox.com/',
    http_function: $.ajax,
    deferred_function: $.Deferred
  });
  
  //getMyAncestors(6);
});

Template.genny.greeting = function () {
  //getMyAncestors(6);
  return "Welcome to genny.";
};

Template.genny.events({
    'click input': function () {
      // template data, if any, is available in 'this'
      getMyAncestors("KWCR-LW4", 6);
    }
});

Template.genny.people = function () {
    return People.find({}, {});
};

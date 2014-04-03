/**
 * Created by ksondere on 4/2/14.
 */
var getAncestors = function (pid, levels) {
    if (levels > 0) {
        FamilySearch.getParents(pid).then(function (response) {
            var relationships = response.getChildAndParentsRelationships();
            var rel = relationships[0];
            var child = response.getPerson(rel.$getChildId());
            child = child.display;
            child.id = rel.$getChildId();
            child.fatherId = rel.$getFatherId();
            child.motherId = rel.$getMotherId();

            if (!People.findOne({id: child.id})) {
                People.insert(child);
                console.log(child);
            }

            var father = response.getPerson(rel.$getFatherId());
            //People.insert(father.display)
            var mother = response.getPerson(rel.$getMotherId());
            //People.insert(mother.display)
            console.log(child);
            PeopleCache.push(child);
            getAncestors(father.id, --levels);
            getAncestors(mother.id, --levels);
        });
    }
};

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
        PeopleCache.length = 0;

        FamilySearch.getAccessToken().then(function (response) {

            FamilySearch.getCurrentUser().then(function (response) {
                var user = response.getUser();
                getAncestors(user.personId, 9);
            });
        });
    },
    'click #id': function () {
        var pid = $('#id').value;
        console.log(pid);
        console.log($('#id'));
        PeopleCache.length = 0;

        FamilySearch.getAccessToken().then(function (response) {
            var user = response.getUser();
            getAncestors(pid, 4);
        });
    }
});

Template.genny.people = function () {
    //return PeopleCache;
    return People.find({$or: [{name: /.*King.*/ },{name: /.*Queen.*/}]})
};

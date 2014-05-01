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

Template.layout.events({
    'click #fs-login': function () {
        PeopleCache.length = 0;

        FamilySearch.getAccessToken().then(function (response) {

            FamilySearch.getCurrentUser().then(function (response) {
                var user = response.getUser();
                getAncestors(user.personId, 9);
            });
        });
    }
});

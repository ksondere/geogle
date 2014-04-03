Template.person.events({
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

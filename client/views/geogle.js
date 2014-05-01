/**
 * Created by ksondere on 4/26/14.
 */
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


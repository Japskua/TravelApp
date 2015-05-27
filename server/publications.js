/**
 * Created by Janne on 26.5.2015.
 */
Meteor.publish('locations', function(options) {
    /*check(options, {
        sort : Object,
        limit : Number
    });*/

    return Locations.find({});
});

Meteor.publish('comments', function() {
    return Comments.find();
});
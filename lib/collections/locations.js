/**
 * Created by Janne on 26.5.2015.
 */
Locations = new Mongo.Collection('locations');

Locations.allow({
    update: function(userId, post) { return ownsDocument(userId, post); },
    remove: function(userId, post) { return ownsDocument(userId, post); }
});

ValidateLocation = function(location) {
    var errors = {};

    if(!location.name) {
        errors.name = "Please fill in a name";
    }

    if(!location.coords) {
        errors.coords = "Please fill in the coordinates";
    }

    if(!location.description) {
        errors.description = "Please fill the location description";
    }

    return errors;
};

Meteor.methods({
    locationInsert : function(locationAttributes) {
        check(this.userId, String);

        var errors = ValidateLocation(locationAttributes);
        if (errors.name || errors.coords || errors.description) {
            throw new Meteor.Error('invalid-location',
                "You must have a name, description and coordinates for the location");
        }

        var user = Meteor.user();
        var location = _.extend(locationAttributes, {
            userId : user._id,
            author : user.username,
            submitted : new Date()
        });
        var locationId = Locations.insert(location);

        return {
            _id : locationId
        };
    }
});
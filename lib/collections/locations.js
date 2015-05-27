/**
 * Created by Janne on 26.5.2015.
 */
Locations = new Mongo.Collection('locations');

ValidateLocation = function(location) {
    var errors = {};

    if(!location.name) {
        errors.name = "Please fill in a name";
    }

    if(!location.coords) {
        errors.coords = "Please fill in the coordinates";
    }

    return errors;
};

Meteor.methods({
    locationInsert : function(locationAttributes) {
        check(this.userId, String);

        var errors = ValidateLocation(locationAttributes);
        if (errors.name || errors.coords) {
            throw new Meteor.Error('invalid-location', "You must have a name and coordinates for the location");
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
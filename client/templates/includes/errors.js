/**
 * Created by Janne on 26.5.2015.
 */
Template.errors.helpers({
    errors : function() {
        return Errors.find();
    }
});

Template.error.onRendered(function() {
    var error = this.data;
    Meteor.setTimeout(function() {
        Errors.remove(error._id);
    }, 3000);
});
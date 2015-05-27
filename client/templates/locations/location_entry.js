/**
 * Created by Janne on 27.5.2015.
 */
Template.locationEntry.helpers({
    ownEntry : function () {
        return this.userId === Meteor.userId();
    }
});
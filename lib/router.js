/**
 * Created by Janne on 26.5.2015.
 */
Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function() {
        //return [Meteor.subscribe('notifications')]
    }
});

LocationsListController = RouteController.extend({
    template: 'locationsList',
    locations : function() {
        return Locations.find();
    },
    waitOn : function() {
        return Meteor.subscribe('locations');
    },
    data : function() {
        return {
            locations : this.locations()
        }
    }
});

Router.route('/', {
    name : 'home',
    controller : LocationsListController
});

var requireLogin = function() {
    if (! Meteor.user()) {
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        } else {
            this.render('accessDenied');
        }
    } else {
        this.next();
    }
};

/**
 * Created by Janne on 26.5.2015.
 */
Router.configure({
    layoutTemplate: 'master_layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function() {
        //return [Meteor.subscribe('notifications')]
    },
    yieldTemplates : {
        header : { to :'header'}
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


Router.route('/commentsBoard', function() {
    this.render('CommentBoard');
});

Router.route('/commentsBox', function() {
    this.render('CommentsBox');
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

/**
 * This directive is necessary to enable preprocessing of JSX tags:
 * @jsx React.DOM
 */

var cx = React.addons.classSet;

var Location = ReactMeteor.createClass({
    render : function() {
        return (
            <div className="location card col s4">
                <div className="card-image">
                    <p>Image here</p>
                    <span className="card-title">{this.props.name}</span>
                </div>
                <div className="location-content card-content">
                    <p>{this.props.coords}</p>
                    <p>{this.props.description}</p>
                    <p>Added by {this.props.author} on {this.props.submitted}</p>
                </div>
                <div className="card-action">
                    <a href="#">Link</a>
                </div>
            </div>
        );
    }
});

var LocationsList = ReactMeteor.createClass({
    templateName : 'LocationsList',
    startMeteorSubscriptions : function() {
        Meteor.subscribe('locations');
    },
    getMeteorState : function() {
        return {
            data : Locations.find({}).fetch()
        };
    },
    getInitialState : function() {
        return { data : [] }
    },
    render : function() {
        var locationNodes = this.state.data.map(function(location) {
            return (
                <Location key={location._id} name={location.name}
                          coords={location.coords} description={location.description}
                          author={location.author} submitted={location.submitted}>
                </Location>
            );
        });
        return (
            <div className="locationsList">
                {locationNodes}
            </div>
        );
    }
});

LocationsListRender = function() {
    React.render(
        <LocationsList />,
        document.getElementById('container')
    );
};


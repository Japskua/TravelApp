/**
 * This directive is necessary to enable preprocessing of JSX tags:
 * @jsx React.DOM
 */
var Location = React.createClass({
    mixins : [ReactMeteor.Mixin],
    render : function() {
        return (
            <div className="location card col s4">
                <div className="card-image">
                    <p>Image here</p>
                    <p>{this.props.name}</p>
                    <span className="card-title">{this.props.name}</span>
                </div>
                <div className="location-content card-content">
                    <p>{this.props.name}</p>
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

var LocationsList = React.createClass({
    mixins : [ReactMeteor.Mixin],
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
            <div className="locationsList locations page row">
                <div className="col s12">
                    {locationNodes}
                </div>
            </div>
        );
    }
});

Template.locationsList.onRendered(function () {
    console.log("Template rendered!");
    React.render(<LocationsList/>, document.getElementById('container'));
});


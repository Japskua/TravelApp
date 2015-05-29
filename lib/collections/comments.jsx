/**
 * This directive is necessary to enable preprocessing of JSX tags:
 * @jsx React.DOM
 */

//var cx = React.addons.classSet;

Comments = new Meteor.Collection('comments');

Meteor.methods({
    addPoints : function(locationId) {
        Comments.update(locationId, { $inc : { score : 1}} )
    }
});

var CommentBoard = React.createClass({
    mixins : [ReactMeteor.Mixin],
    templateName : 'CommentBoard',

    startMeteorSubscriptions : function() {
        Meteor.subscribe('comments');
    },

    getMeteorState : function() {
        var selectedComment = Comments.findOne(Session.get('selectedComment'));
        return {
            comments : Comments.find({}, {sort : {score:-1, name:-1}}).fetch(),
            selectedComment : selectedComment,
            selectedName : selectedComment && selectedComment.name
        };
    },

    addPoints : function() {
        Meteor.call('addPoints', Session.get('selectedComment'));
    },

    selectComment : function(id) {
        Session.set('selectedComment', id);
    },

    renderComment : function(model) {
        var _id = this.state.selectedComment && this.state.selectedComment._id;

        return <Comment
            key={model._id}
            name={model.name}
            score={model.score}
            author={model.author}
            text={model.text}
            className={model._id === _id ? "selected" : ""}
            onClick={this.selectComment.bind(this, model._id)}
        />;
    },

    render : function() {
        var children = [
            <div className="comment">
                {this.state.comments.map(this.renderComment)}
            </div>
            ];

        if(this.state.selectedComment) {
            children.push(
                <div className="details">
                    <div className="name">{this.state.selectedName}</div>
                    <input
                        type="button"
                        className="inc"
                        value="Give +1"
                        onClick={this.addPoints}
                    />
                </div>
            );
        } else {
            children.push(
                <div className="none">Click a comment to select</div>
            )
        }

        return <div className="inner">{ children }</div>;
    }
});

var Comment = React.createClass({
    mixins : [ReactMeteor.Mixin],
    shouldComponentUpdate : function(nextProps, nextState) {
        var { name, score, ...rest } = this.props;
        return name !== nextProps.name || score !== nextProps.score || rest.className !== nextProps.className;
    },
    render : function() {
        var { name, score, ...rest } = this.props;
        return <div {...rest} className={cx("comment", rest.className)}>
            <span className="name">{name}</span>
            <span className="score">{score}</span>
        </div>;
    }
});
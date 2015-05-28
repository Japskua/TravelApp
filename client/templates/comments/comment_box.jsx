/**
 * This directive is necessary to enable preprocessing of JSX tags:
 * @jsx React.DOM
 */

var cx = React.addons.classSet;


var Comment = ReactMeteor.createClass({
    render : function() {
        return (
            <div className="commentBox">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                {this.props.children}
            </div>
        );
    }
});

var CommentList = ReactMeteor.createClass({
    // Subsribe to Meteor
    startMeteorSubscriptions : function() {
        Meteor.subscribe('comments');
    },
    // Needed to get meteor information
    getMeteorState : function() {
        return {
            data : Comments.find({}).fetch()
        };
    },
    render : function() {
        var commentNodes = this.state.data.map(function(comment){
            return (
                <Comment key={comment._id} author={comment.author}>
                        Content:{comment.text}
                        Score:{comment.score}
                </Comment>
            );
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
});

var CommentForm = ReactMeteor.createClass({
    handleSubmit : function(e) {
        // Prevent the default behavior
        // Then continue onwards
        e.preventDefault();
        var author = React.findDOMNode(this.refs.author).value.trim();
        //var author = this.refs.author.getDOMNode().value.trim();
        var text = this.refs.text.getDOMNode().value.trim();
        if (!text || !author) {
            return;
        }
        this.props.onCommentSubmit({ author : author, text : text});
        this.refs.author.getDOMNode().value = '';
        this.refs.text.getDOMNode().value = '';
    },
    render : function() {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Your name" ref="author"/>
                <input type="text" placeholder="Say something..." ref="text"/>
                <input type="submit" value="Post" />
            </form>
        )
    }
});

var CommentBox = ReactMeteor.createClass({
    handleCommentSubmit : function(comment) {
        var comments = this.state.data;
        comments.push(comment);
        this.setState({ data : comments});
        comment._id = Comments.insert(comment);
    },
    templateName : 'CommentBox',
    getInitialState : function() {
        return { data : []}
    },
    render : function() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data}/>
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
        );
    }
});

CommentsBoxRender = function() {
    React.render(
        <CommentBox />,
        document.getElementById('container')
    );
};

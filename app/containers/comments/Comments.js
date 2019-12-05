import React, { useState } from 'react';
import classNames from 'classnames';
import { RubberBand } from '../../components/animations';
import './index.css';

const CreateCommentList = (comments) => {
    const commentList = [];

    for (let comment of comments) {
        if (comment.hasOwnProperty('replies')) {
            commentList.push(
                <Comment
                    user={ comment.user }
                    message={ comment.message }
                    timecode={ comment.timecode }
                    replies={ CreateCommentList(comment.replies) }
                />);

            continue;
        }

        commentList.push(<Comment
            user={ comment.user }
            message={ comment.message }
            timecode={ comment.timecode }
        />);
    }

    return commentList;
};

const Comment = ({ user, message, timecode, replies }) => {
    const hasComments = replies || false;

    const [ collapsed, setCollapsed ] = useState(true);

    const commentsClassNames = classNames({
        'comments': true,
        'collapsed': collapsed
    });

    const commentClassNames = classNames({
       'comment': true,
       'hasReplies': hasComments
    });

    const handleClickAllReplies = () => {
        setCollapsed(!collapsed);
    };

    const actionViewAllRepliesMessage = collapsed ? 'View all replies' : 'Hide replies';

    return (
        <div className={ commentClassNames }>
            <a className="avatar">
                <img src={ user.image } />
            </a>
            <div className="content">
                <a className="author">{ user.name }</a>
                <div className="metadata">
                    <span className="date">{ timecode }</span>
                </div>
                <div className="text">
                    { message }
                </div>
                <div className="actions">
                    <a className="reply">Reply</a>

                    {
                        hasComments &&

                        <a onClick={ handleClickAllReplies } className="replies">{ actionViewAllRepliesMessage }</a>
                    }
                </div>
            </div>

            {
                hasComments &&

                <div className={ commentsClassNames }>
                    { replies }
                </div>
            }
        </div>
    );
};

const Comments = ({ replies }) => {
    return (
        <Comment replies={ replies }/>
    );
};

const CommentsList = ({ comments }) => {
    return (
        <div className="ui comments">
            <h3 className="ui dividing header">Comments</h3>
            { CreateCommentList(comments) }
        </div>
    );
};

export default CommentsList;

import React, { useState } from 'react';
import classNames from 'classnames';
import { RubberBand } from '../../components/animations';
import './index.css';

const Comment = ({ comments, children }) => {
    const hasComments = comments || false;

    const [ collapsed, setCollapsed ] = useState(true);

    const commentsClassNames = classNames({
        'comments': true,
        'collapsed': collapsed
    });

    const handleClickAllReplies = () => {
        setCollapsed(!collapsed);
    };

    const actionViewAllRepliesMessage = collapsed ? 'View all replies' : 'Hide replies';

    return (
        <div className="comment">
            <a className="avatar">
                <img src="https://semantic-ui.com/images/avatar/small/jenny.jpg" />
            </a>
            <div className="content">
                <a className="author">Jenny Hess</a>
                <div className="metadata">
                    <span className="date">Just now</span>
                </div>
                <div className="text">
                    Elliot you are always so right :)
                </div>
                <div className="actions">
                    <a className="reply">Reply</a>

                    {
                        hasComments &&

                        <a onClick={ handleClickAllReplies } className="reply">{ actionViewAllRepliesMessage }</a>
                    }
                </div>
            </div>

            {
                hasComments &&

                <div className={ commentsClassNames }>
                    { comments }
                </div>
            }
        </div>
    );
};

const Comments = ({ comments }) => {
    return (
        <Comment comments={ comments }/>
    );
};

const CommentsList = () => {
    return (
        <div className="ui comments">
            <h3 className="ui dividing header">Comments</h3>
            <Comment comments={ <Comments comments={ <Comments comments={ <Comments comments={ <Comments /> } /> }/> } /> } />
            <Comment />
            <Comment />
        </div>
    );
};

export default CommentsList;

import classNames from 'classnames';
import './menu.css';

export default ({ children, isDropped }) => {
    const className = classNames({
        'shown': isDropped
    });

    return (
        <div id="top_profile_menu" className={ className }>
            { children }
        </div>
    );
};


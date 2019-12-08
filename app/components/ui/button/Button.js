import classNames from 'classnames';
import './index.css';

export const FlatButton = ({ label, onClick, className }) => {
    let btnClassNames = classNames({
        "flat_button button_wide": true,
        ...className
    });

    return (
        <button onClick={ onClick } className={ btnClassNames }>
            { label }
        </button>
    );
};

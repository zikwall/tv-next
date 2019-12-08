import classNames from 'classnames';
import './index.css';

export const FlatButton = ({ label, onClick, className, isWide }) => {
    let btnClassNames = classNames({
        "flat_button": true,
        "button_wide": isWide,
        ...className
    });

    return (
        <button onClick={ onClick } className={ btnClassNames }>
            { label }
        </button>
    );
};

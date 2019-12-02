import React, {useRef, useState} from "react";
import cn from 'classnames';
import './index.css';

/**
 * TODO add outside click
 */
const Search = ({ onSearch }) => {
    const [isEmpty, setIsEmpty] = useState(true);
    const inputRef = useRef();

    const handleSearchInput = (e) => {
        let val = e.target.value;

        if (val.length !== 0) {
            setIsEmpty(false)
        } else {
            if (isEmpty === false) {
                setIsEmpty(true);
            }
        }

        onSearch(val);
    };

    const handleClearClick = (e) => {
        inputRef.current.value = '';
        setIsEmpty(true);
        onSearch('');
    };

    return (
        <div className={cn({
            'ui_search_new ui_search groups_list_search _wrap': true,
            'ui_search_field_empty': isEmpty
        })}>
            <div className="ui_search_input_block">
                <button className="ui_search_button_search _ui_search_button_search"></button>
                <div className="ui_search_input_inner">
                    <div className="ui_search_controls">
                        <button onClick={ handleClearClick }
                                className="ui_search_reset_button ui_search_button_control">
                        </button>
                    </div>
                    <input onChange={ handleSearchInput } ref={ inputRef } type="text"
                           className="ui_search_field _field"
                           placeholder="Поиск телеканалов" />
                </div>
            </div>
        </div>
    );
};

export default Search;
import './index.css';

const Wrap = ({ children }) => {
    return (
        <div className="_watch_page_layout watch_page_layout watch_page_layout2">
            <div className="_watch_page_content_block_wrap watch_page_content_block_wrap">
                <div className="_watch_recoms_blocks watch_recoms_blocks">
                    <div className="watch_recoms_block">
                        <div className="clear_fix _watch_pl watch_recoms_watchs_block watch_w_covers">
                            <div className="watch_recoms_watchs_block_col_left">
                                { children }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wrap;

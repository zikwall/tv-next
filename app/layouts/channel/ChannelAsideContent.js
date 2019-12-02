import React, {useState} from "react";
import { Search } from "../../components/ui";
import Link from "next/link";

const ChannelAsideContent = () => {
    const [search, setSearch] = useState('');

    const onSearch = (search) => {
        setSearch(search);
    };

    return (
        <>
            <div className="col-md-12">
                <div className="footer-about">
                    <div className="widget">
                        <h5 className="widget-title">Navigation</h5>
                        <ul className="list-inline vertical-list">
                            <li><Link href="/">
                                <a>Go to Home</a>
                            </Link></li>
                            <li><Link href="/help">
                                <a>Help &amp; Support</a>
                            </Link></li>
                            <li><Link href="/contact">
                                <a>Contact</a>
                            </Link></li>
                            <li><Link href="/privacy">
                                <a>Terms &amp; Privacy</a>
                            </Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div style={{marginBottom: '5px'}}>
                <Search value={ search } onSearch={ onSearch } />
            </div>
        </>
    );
};

export default ChannelAsideContent;

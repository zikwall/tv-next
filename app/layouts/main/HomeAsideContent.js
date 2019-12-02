import React from "react";
import Link from "next/link";

const HomeAsideContent = () => {
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
        </>
    )
};

export default HomeAsideContent;

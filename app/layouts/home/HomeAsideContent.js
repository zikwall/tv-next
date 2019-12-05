import React from "react";
import { Menu, MenuActiveItem } from "../../components/ui/menu";

const HomeAsideContent = () => {
    return (
        <>
            <Menu>
                <MenuActiveItem isActive url="/" >
                    Go to Home
                </MenuActiveItem>
                <MenuActiveItem url="/help" >
                    Help &amp; Support
                </MenuActiveItem>
                <MenuActiveItem url="/contact" >
                    Contact
                </MenuActiveItem>
                <MenuActiveItem url="/privacy" >
                    Terms &amp; Privacy
                </MenuActiveItem>
            </Menu>
        </>
    );
};

export default HomeAsideContent;

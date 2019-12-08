import { useState } from "react";
import classNames from 'classnames';
import Menu from "./Menu";
import QuickLogin from "./QuickLogin";
import { CloseWrapper } from "../../containers/close";
import MenuContentTemporary from "./MenuContentTemporary";

const ProfileBar = ({ isAuthenticated }) => {
    const [ isDropped, setIsDropped ] = useState(false);

    const handleBarClick = (e) => {
        e.preventDefault();

        setIsDropped(!isDropped);
    };

    const handleEscapeOutside = () => {
        setIsDropped(false);
    };

    const barClassNames = classNames({
        'nav-link w-nowrap pr-0': true,
        'dropdown-toggle': isAuthenticated
    });

    const Auth = () => {
        return (
            <>
                <a onClick={ handleBarClick } className={ barClassNames } href="#">
                    <div className="flex-row d-inline-flex">
                        <div className="user">
                            <img className="rounded-circle" src="https://avatars2.githubusercontent.com/u/23422968?s=460&v=4" alt="" />
                        </div>
                        <span className="ml-2 mt-2 fs-1 d-none d-lg-block">Andrey Ka</span>
                    </div>
                </a>

                <CloseWrapper onEscapeOutside={ handleEscapeOutside }>
                    <Menu isDropped={ isDropped} >
                        <MenuContentTemporary />
                    </Menu>
                </CloseWrapper>
            </>
        );
    };

    const Guest = () => {
        return (
            <>
                <a onClick={ handleBarClick } className={ barClassNames } href="#">
                    <div className="flex-row d-inline-flex">
                        <div className="user">
                            <img className="rounded-circle" src="/assets/images/user-placeholder-circle-1.png" alt="" />
                        </div>
                        <span className="ml-2 mt-2 fs-1 d-none d-lg-block">Authorization</span>
                    </div>
                </a>
                <CloseWrapper onEscapeOutside={ handleEscapeOutside }>
                    <Menu isDropped={ isDropped }>
                        <QuickLogin />
                    </Menu>
                </CloseWrapper>
            </>
        );
    };

    const dropClassNames = classNames({
        'nav-item position-relative mr-4': true,
        'show': isDropped
    });

    const Content = isAuthenticated ? <Auth/> : <Guest/>

    return (
        <>
            <div className={ dropClassNames } id="dropdownUserSettings">
                { Content }
            </div>
        </>
    );
};

export default ProfileBar;

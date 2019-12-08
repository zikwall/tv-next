import { connect } from "react-redux";
import { deauthenticate } from "../../redux/actions";

const MenuContentTemporary = ({ deauthenticate }) => {
    const handleClickLogout = (e) => {
        e.preventDefault();

        deauthenticate();
    };

    return (
        <>
            <a className="top_profile_mrow" href="/id.kapitonov">Моя страница</a>
            <div className="top_profile_sep"></div>
            <a className="top_profile_mrow" href="/edit">Редактировать</a>
            <a className="top_profile_mrow" href="/settings">Настройки</a>
            <a className="top_profile_mrow" href="/support?act=home">Помощь</a>
            <div className="top_profile_sep"></div>

            <a onClick={ handleClickLogout } className="top_profile_mrow" href="">Выйти</a>
        </>
    );
};

export default connect(
    state => state,
    { deauthenticate }
)(MenuContentTemporary);

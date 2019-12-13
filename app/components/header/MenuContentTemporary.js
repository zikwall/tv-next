import { connect } from "react-redux";
import { deauthenticate } from "../../redux/actions";

const MenuContentTemporary = ({ deauthenticate }) => {
    const handleClickLogout = (e) => {
        e.preventDefault();

        deauthenticate();
    };

    return (
        <>
            <a className="top_profile_mrow" href="/">На главную</a>
            <a className="top_profile_mrow" href="/id.kapitonov">Моя страница</a>
            <a className="top_profile_mrow" href="/favorites">Избранное</a>
            <div className="top_profile_sep"></div>
            <a className="top_profile_mrow" href="/edit">Редактировать</a>
            <a className="top_profile_mrow" href="/settings">Настройки</a>
            <a className="top_profile_mrow" href="/support?act=home">Помощь!!!</a>
            <div className="top_profile_sep"></div>
            <a className="top_profile_mrow" href="/admin">Царюшкина админка</a>
            <div className="top_profile_sep"></div>
            <a onClick={ handleClickLogout } className="top_profile_mrow" href="">Выйти, но зачем :(</a>
        </>
    );
};

export default connect(
    state => state,
    { deauthenticate }
)(MenuContentTemporary);

import { useState } from 'react';
import { connect } from 'react-redux';
import { authenticate } from "../../redux/actions";
import './quicklogin.css';

const QuickLogin = (props) => {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleChangeUsername = (e) => {
        setUsername(e.target.value);
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleClickSubmit = (e) => {
        e.preventDefault();

        props.authenticate(
            { username: username, password: password },
            'signin'
        );
    };

    return (
        <div className="quick_login">
            <form name="login">
                <div className="label">Телефон или email</div>
                <div className="labeled">
                    <input value={ username } onChange={ handleChangeUsername } type="text" name="email" className="dark"/>
                </div>

                <div className="label">Пароль</div>
                <div className="labeled">
                    <input value={ password } onChange={ handleChangePassword } type="password" name="pass" className="dark"/>
                </div>
            </form>

            <button onClick={ handleClickSubmit } className="quick_login_button flat_button button_wide">
                Войти
            </button>

            <button className="quick_reg_button flat_button button_wide">
                Регистрация
            </button>

            <div className="clear forgot">
                <div className="checkbox" role="checkbox" aria-checked="false" tabIndex="0">
                    Чужой компьютер
                </div>

                <a className="quick_forgot" href="/restore" target="_top">Забыли пароль?</a>
            </div>
        </div>
    );
};

export default connect(
    state => state,
    { authenticate }
)(QuickLogin);

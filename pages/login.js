import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import Router from "next/router";
import { Block, BlockBody } from "../app/components/ui";
import Head from "next/dist/next-server/lib/head";
import { MainLayout } from "../app/layouts";
import { FlatButton } from '../app/components/ui/button';
import { authenticate } from "../app/redux/actions";
import './login.css';

const Login = ({ isAuthenticated, authenticate }) => {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            Router.push('/');
        }

        return () => {}
    });

    const hasError = () => {
        return error !== false;
    };

    const handleChangeUsername = (e) => {
        e.preventDefault();

        setUsername(e.target.value);
    };

    const handleChangePassword = (e) => {
        e.preventDefault();

        setPassword(e.target.value);
    };

    const handleClickRestore = (e) => {
        e.preventDefault();
    };

    const handleClickSubmit = (e) => {
        e.preventDefault();

        authenticate(
            { username: username, password: password },
            'signin'
        );
    };

    return (
        <>
            <MainLayout title="Авторизация">
                <Head>
                    <title>Просто ТВ | Авторизация</title>
                </Head>

                <section className="login_page center-login" style={{ maxWidth: '980px'}}>
                    <div className="music-img-box-cont-sm">
                        <Block>
                            <BlockBody>
                                {
                                    hasError() &&

                                    <div id="login_message">
                                        <div className="msg error">
                                            <div className="msg_text"><b>Не удаётся войти.</b><br />Пожалуйста, проверьте
                                                правильность написания <b>логина</b> и <b>пароля</b>.
                                                <ul className="listing">
                                                    <li><span>Возможно, нажата клавиша <b>Caps Lock</b>?</span></li>
                                                    <li><span>Может быть, у Вас включена неправильная <b>раскладка</b>? (русская или английская)</span>
                                                    </li>
                                                    <li>
                                                        <span>Попробуйте набрать свой пароль в текстовом редакторе и <b>скопировать</b> в графу «Пароль»</span>
                                                    </li>
                                                    <li>
                                                        <span>Если пароль набран верно, попробуйте указать в качестве логина <b>номер привязанного телефона</b>, а не почту.</span>
                                                    </li>
                                                </ul>
                                                Если Вы всё внимательно проверили, но войти всё равно не удается, Вы
                                                можете <b><a href="/restore">нажать сюда</a></b>.</div>
                                        </div>
                                    </div>
                                }

                                {
                                    !hasError() && <div style={{marginTop: '10px'}} />
                                }

                                <div className="login_form_wrap">
                                    <form>
                                        <input onChange={ handleChangeUsername } type="text" className="big_text" name="email" value={ username }
                                               placeholder="Телефон или email" />

                                        <input onChange={ handleChangePassword } type="password" className="big_text" name="pass" value={ password }
                                               placeholder="Пароль" />

                                        <div className="login_buttons_wrap">

                                            <FlatButton onClick={ handleClickSubmit }
                                                        label="Войти"
                                                        className={{"button_big_text login_button": true }}
                                            />

                                            <FlatButton label="Регистрация"
                                                        className={{"button_big_text login_reg_button": true}}
                                            />
                                        </div>
                                    </form>
                                </div>

                                <div className="login_fast_restore_wrap _retore_wrap">
                                    <a onClick={ handleClickRestore } className="login_link login_fast_restore_link" href="#">
                                        Забыли пароль или не можете войти?
                                    </a>
                                </div>
                            </BlockBody>
                        </Block>
                    </div>
                </section>
            </MainLayout>
        </>
    );
};

const mapStateToProps = (state) => (
    { isAuthenticated: !!state.authentication.token }
);

export default connect(mapStateToProps, { authenticate })(Login);

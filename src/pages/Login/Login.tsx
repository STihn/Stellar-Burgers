
import React from "react";
import styles from './Login.module.css';
import cn from "classnames";
import { useSelector, useDispatch } from 'react-redux';

import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from "react-router-dom";
import { login } from "../../services/actions/actions";

interface RootState {
    userReducuer: any
}

const Login: React.FC = () => {
    const dispatch = useDispatch();
    const {userInfo} = useSelector((store: RootState) => store.userReducuer)
    const [valueEmail, setValueEmail] = React.useState('');
    const [valuePassword, setValuePassword] = React.useState('');
    const infoRegistry: Record<string, any> = {}

    // const onChangePassword = (e: any) => {
    //     setValuePassword(e.target.value)
    // }

    // const onChangeEmail = (e: any) => {
    //     setValueEmail(e.target.value)
    // }
    const loginUser = () => {
        infoRegistry.email = valueEmail;
        infoRegistry.password = valuePassword;
        // console.log(login(infoRegistry))
        dispatch(login(infoRegistry))
        if(userInfo.success) {
            return (
                <Redirect
                    push to={'/'}
                />
              );
        }
    }



    return (
        <main className={styles.root}>
            <h1 className={cn(styles.title, 'text text_type_main-large')}>Вход</h1>
            <div className={cn(styles.wrap, 'mb-6')}>
            <Input
                type={'text'}
                placeholder={'e-mail'}
                onChange={e => setValueEmail(e.target.value)}
                // icon={'CurrencyIcon'}
                value={valueEmail}
                name={'name'}
                error={false}
                // ref={inputRef}
                // onIconClick={onIconClick}
                errorText={'Ошибка'}
                // size={}
            />
            </div>
            <div className={cn(styles.wrap, 'mb-6')}>
                <PasswordInput 
                    onChange={e => setValuePassword(e.target.value)} 
                    value={valuePassword} 
                    name={'password'} 
                />
            </div>
            <div className={cn(styles.button_wrap, 'mb-20', 'text text_type_main-small')}>
                <Button 
                    type="primary" 
                    size="small"
                    onClick={()=> loginUser()}
                >
                    Войти
                </Button>
            </div>
            <div className={cn(styles.wrap_text, 'mb-4')}>
                <p className={cn(styles.text, 'text text_type_main-default')}>Вы новый пользователь? </p> <p className={cn(styles.text_link, 'text text_type_main-default')}><Link to={'/register'}>Зарегистрироваться</Link></p>
            </div>
            <div className={styles.wrap_text}>
                <p className={cn(styles.text, 'text text_type_main-default')}>Забыли пароль? </p> <p className={cn(styles.text_link, 'text text_type_main-default')}><Link to={'/forgot-password'}>Восстановить пароль</Link></p>
            </div>

        </main>
    )
}

export default Login;
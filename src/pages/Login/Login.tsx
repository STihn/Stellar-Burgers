
import React from "react";
import styles from './Login.module.css';
import cn from "classnames";
import { useSelector, useDispatch } from 'react-redux';

import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from "react-router-dom";
import { login } from "../../services/actions/actionsUser";

interface RootState {
    userReducuer: any
}

const Login: React.FC = () => {
    const dispatch = useDispatch();
    const {auth} = useSelector((store: RootState) => store.userReducuer)
    const [valueEmail, setValueEmail] = React.useState('');
    const [valuePassword, setValuePassword] = React.useState('');
    const infoRegistry: Record<string, any> = {}


    const loginUser = (e: any) => {
        e.preventDefault();
        infoRegistry.email = valueEmail;
        infoRegistry.password = valuePassword;
        dispatch(login(infoRegistry))
    }

    if (auth.success) {
        return (
          <Redirect
            to={{
              pathname: '/'
            }}
          />
        );
      }

    return (
        <main className={styles.root}>
            <h1 className={cn(styles.title, 'text text_type_main-large')}>Вход</h1>
            <form onSubmit={(e)=> loginUser(e)}>
                <div className={cn(styles.wrap, 'mb-6')}>
                <Input
                    type={'text'}
                    placeholder={'e-mail'}
                    onChange={e => setValueEmail(e.target.value)}
                    value={valueEmail}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
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
                    >
                        Войти
                    </Button>
                </div>
            </form>
            <div className={cn(styles.wrap_text, 'mb-4')}>
                <p className={cn(styles.text, 'text text_type_main-default')}>Вы новый пользователь? </p> 
                <p className={cn(styles.text_link, 'text text_type_main-default')}><Link to={'/register'}>Зарегистрироваться</Link></p>
            </div>
            <div className={styles.wrap_text}>
                <p className={cn(styles.text, 'text text_type_main-default')}>Забыли пароль? </p> 
                <p className={cn(styles.text_link, 'text text_type_main-default')}><Link to={'/forgot-password'}>Восстановить пароль</Link></p>
            </div>

        </main>
    )
}

export default Login;
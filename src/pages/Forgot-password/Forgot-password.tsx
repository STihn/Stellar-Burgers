import React from "react";
import styles from './Forgot-password.module.css';
import cn from 'classnames';
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../services/actions/actions";


const ForgotPassword: React.FC = () => {

    const inputRef = React.useRef(null);
    const [valueEmail, setValueEmail] = React.useState('');
    const infoRegistry: Record<string, any> = {}

    // const onChangeEmail = (e: any) => {
    //     setValueEmail(e.target.value)
    // }

    const ForgotUser = () => {
        infoRegistry.email = valueEmail;
        forgotPassword(infoRegistry)
    }
    return (
        <main className={styles.root}>
            <h1 className={cn(styles.title, 'text text_type_main-large')}>Восстановление пароля</h1>
            <div className={cn(styles.wrap, 'mb-6')}>
                <Input
                    type={'email'}
                    placeholder={'Укажите e-mail'}
                    onChange={e => setValueEmail(e.target.value)}
                    // icon={'CurrencyIcon'}
                    value={valueEmail}
                    name={'name'}
                    error={false}
                    ref={inputRef}
                    // onIconClick={onIconClick}
                    errorText={'Ошибка'}
                    // size={}
                />
            </div>
            <div className={cn(styles.button_wrap, 'mb-20', 'text text_type_main-small')}>
                <Button 
                    type="primary" 
                    size="small"
                    onClick={() => ForgotUser() as any}
                >
                    Восстановить
                </Button>
            </div>
            <div className={cn(styles.wrap_text, 'mb-4')}>
                <p className={cn(styles.text, 'text text_type_main-default')}>Вспомнили пароль? </p> 
                <p className={cn(styles.text_link, 'text text_type_main-default')}><Link to={'/login'}>Войти</Link></p>
            </div>
    </main> 
    )
}

export default ForgotPassword;
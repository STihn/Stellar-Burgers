import React from "react";
import styles from './Forgot-password.module.css';
import cn from 'classnames';
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory } from "react-router-dom";
import { forgotPassword } from "../../services/Api";


const ForgotPassword: React.FC = () => {
    const history = useHistory();
    const inputRef = React.useRef(null);
    const [valueEmail, setValueEmail] = React.useState('');
    const infoRegistry: Record<string, any> = {}

    const ForgotUser = (e: any) => {
        e.preventDefault()
        infoRegistry.email = valueEmail;
        (forgotPassword(infoRegistry) as any)
        .then((res: any) => {
            if(res.success) {
                history.push('/reset-password')
            }
        })
    }


    return (
        <main className={styles.root}>
            <h1 className={cn(styles.title, 'text text_type_main-large')}>Восстановление пароля</h1>
            <form  onSubmit={(e) => ForgotUser(e) as any}>
                <div className={cn(styles.wrap, 'mb-6')}>
                    <Input
                        type={'email'}
                        placeholder={'Укажите e-mail'}
                        onChange={e => setValueEmail(e.target.value)}
                        value={valueEmail}
                        name={'name'}
                        error={false}
                        ref={inputRef}
                        errorText={'Ошибка'}
                    />
                </div>
                <div className={cn(styles.button_wrap, 'mb-20', 'text text_type_main-small')}>
                    <Button 
                        type="primary" 
                        size="small"
                    >
                        Восстановить
                    </Button>
                </div>
            </form>
            <div className={cn(styles.wrap_text, 'mb-4')}>
                <p className={cn(styles.text, 'text text_type_main-default')}>Вспомнили пароль? </p> 
                <p className={cn(styles.text_link, 'text text_type_main-default')}><Link to={'/login'}>Войти</Link></p>
            </div>
    </main> 
    )
}

export default ForgotPassword;
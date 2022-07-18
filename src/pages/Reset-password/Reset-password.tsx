import React from "react";
import styles from "./Reset-password.module.css";
import cn from "classnames";
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory } from "react-router-dom";
import { resetPassword } from "../../services/Api";



const ResetPassword: React.FC = () => {
    const history = useHistory();
    const [valueToken, setValueToken] = React.useState('');
    const [valuePassword, setValuePassword] = React.useState('');
    const infoRegistry: Record<string, any> = {};

    const ResetPass = (e: any) => {
        e.preventDefault();
        infoRegistry.password = valuePassword;
        infoRegistry.token = valueToken;
        (resetPassword(infoRegistry) as any)
        .then((res: any) => {
            if(res.success) {
                history.push('/login')
            }
        })
    }

    return (
        <main className={styles.root}>
            <h1 className={cn(styles.title, 'text text_type_main-large')}>Восстановление пароля</h1>
            <form onSubmit={(e)=> ResetPass(e)}>
                <div className={cn(styles.wrap, 'mb-6')}>
                    <PasswordInput 
                        onChange={e => setValuePassword(e.target.value)} 
                        value={valuePassword} 
                        name={'password'} 
                    />
                </div>
                <div className={cn(styles.wrap, 'mb-6')}>
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={e => setValueToken(e.target.value)}
                    value={valueToken}
                    name={'code'}
                    error={false}
                    errorText={'Ошибка'}
                />
                </div>
                <div className={cn(styles.button_wrap, 'mb-20', 'text text_type_main-small')}>
                    <Button 
                        type="primary" 
                        size="small"
                    >
                        Сохранить
                    </Button>
                </div>
            </form>
            <div className={cn(styles.wrap_text, 'mb-4')}>
                <p className={cn(styles.text, 'text text_type_main-default')}>Вспомнили пароль? </p> <p className={cn(styles.text_link, 'text text_type_main-default')}><Link to={'/login'}>Войти</Link></p>
            </div>
        </main>
    )
}
export default ResetPassword;
import React from "react";
import styles from "./Reset-password.module.css";
import cn from "classnames";
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { resetPassword } from "../../services/actions/actions";


const ResetPassword: React.FC = () => {

    const [valueToken, setValueToken] = React.useState('');
    const [valuePassword, setValuePassword] = React.useState('');
    const infoRegistry: Record<string, any> = {}
    // const onChangePassword = (e: any) => {
    //     setValuePassword(e.target.value)
    // }

    // const onChangeEmail = (e: any) => {
    //     setValueEmail(e.target.value)
    // }

    const ResetPass = () => {
        infoRegistry.password = valuePassword;
        infoRegistry.token = valueToken;
        console.log(infoRegistry)
        resetPassword(infoRegistry)
    }


    return (
        <main className={styles.root}>
            <h1 className={cn(styles.title, 'text text_type_main-large')}>Восстановление пароля</h1>
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
                // icon={'CurrencyIcon'}
                value={valueToken}
                name={'code'}
                error={false}
                // ref={inputRef}
                // onIconClick={onIconClick}
                errorText={'Ошибка'}
                // size={}
            />
            </div>
            <div className={cn(styles.button_wrap, 'mb-20', 'text text_type_main-small')}>
                <Button 
                    type="primary" 
                    size="small"
                    onClick={()=> ResetPass()}
                >
                    Сохранить
                </Button>
            </div>
            <div className={cn(styles.wrap_text, 'mb-4')}>
                <p className={cn(styles.text, 'text text_type_main-default')}>Вспомнили пароль? </p> <p className={cn(styles.text_link, 'text text_type_main-default')}><Link to={'/login'}>Войти</Link></p>
            </div>
        </main>
    )
}
export default ResetPassword;
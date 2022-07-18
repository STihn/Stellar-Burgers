import React from "react";
import styles from './Register.module.css';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { registry } from "../../services/actions/actionsUser";


const Register: React.FC = () => {
    const dispatch = useDispatch();
    const inputRef = React.useRef(null);
    const [valueName, setValueName] = React.useState('');
    const [valueEmail, setValueEmail] = React.useState('');
    const [valuePassword, setValuePassword] = React.useState('');
    const infoRegistry: Record<string, any> = {}

    const registryUser = (e: any) => {
        e.preventDefault();
        infoRegistry.email = valueEmail;
        infoRegistry.password = valuePassword;
        infoRegistry.name = valueName;

        dispatch(registry(infoRegistry))
    }



    return (
        <main className={styles.root}>
        <h1 className={cn(styles.title, 'text text_type_main-large')}>Регистрация</h1>
        <form onSubmit={(e) => registryUser(e) as any}>
            <div className={cn(styles.wrap, 'mb-6')}>
            <Input
                type={'text'}
                placeholder={'имя'}
                onChange={e => setValueName(e.target.value)}
                value={valueName}
                name={'name'}
                error={false}
                ref={inputRef}
                errorText={'Ошибка'}
                size={"default"}
            />
            </div>
            <div className={cn(styles.wrap, 'mb-6')}>
            <Input
                type={'email'}
                placeholder={'e-mail'}
                onChange={e => setValueEmail(e.target.value)}
                value={valueEmail}
                name={'email'}
                error={false}
                errorText={'Ошибка'}
                size={"default"}
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
                    Зарегистрироваться
                </Button>
            </div>
        </form>
        
        <div className={cn(styles.wrap_text, 'mb-4')}>
            <p className={cn(styles.text, 'text text_type_main-default')}>Уже зарегистрированы? </p> <p className={cn(styles.text_link, 'text text_type_main-default')}><Link to={'/login'}>Войти</Link></p>
        </div>
    </main>
    )
}

export default Register;
import React, { FormEvent, useEffect } from "react";
import styles from './Profile.module.css';
import cn from 'classnames';
import { useSelector } from "../../utils/types";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { fetchChangeUser } from "../../services/Api";
import { ProfileNavigation } from "../../components/profileNavigation/ProfileNavigation";


const Profile: React.FC = ( ) => {
    const {auth} = useSelector((store) => store.userReducuer)
    const [valueName, setValueName] = React.useState<string>('');
    const [valueLogin, setValueLogin] = React.useState<string>('');
    const [valuePassword, setValuePassword] = React.useState<string>('');
    const infoRegistry: Record<string, any> = {};

    useEffect(() => {
        if(auth !== null) {
            setValueName(auth.user.name);
            setValueLogin(auth.user.email) 
        }
     }, [auth]);

    const changeUser = (e: FormEvent) => {
        e.preventDefault()
        infoRegistry.name = valueName;
        infoRegistry.email = valueLogin;
        infoRegistry.password = valuePassword;
        fetchChangeUser(infoRegistry)
    }

    return (
        <main className={styles.root}>
            <div className={cn(styles.wrapper,  'mr-15')}>
                <div className={cn(styles.wrap, 'mb-20')}>
                {<ProfileNavigation/>}
                </div>
                <p className={cn('text text_type_main-small', styles.text)}>В этом разделе вы можете изменить свои персональные данные</p>
            </div>
                <form className={cn(styles.block)} onSubmit={(e)=> changeUser(e)}>
                <div className={cn(styles.wrap_input, 'mb-6')}>
                    <Input
                        type={'text'}
                        placeholder={'имя'}
                        onChange={e => setValueName(e.target.value)}
                        icon={'EditIcon'}
                        value={valueName}
                        name={'name'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                </div>
                <div className={cn(styles.wrap_input, 'mb-6')}>
                    <Input
                        type={'email'}
                        placeholder={'логин'}
                        onChange={e => setValueLogin(e.target.value)}
                        icon={'EditIcon'}
                        value={valueLogin}
                        name={'Login'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                </div>
                <div className={cn(styles.wrap_input, 'mb-6')}>
                    <Input
                        type={'password'}
                        placeholder={'пароль'}
                        onChange={e => setValuePassword(e.target.value)}
                        icon={'EditIcon'}
                        value={valuePassword}
                        name={'password'}
                        error={false}
                        
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                </div>
                <div className={cn(styles.wrap_button)}>
                    <p className={cn(styles.cancel, 'text text_type_main-default')}>Отмена</p>
                    <button type="submit" className={cn(styles.submit, 'text text_type_main-default')}>Сохранить</button>
                </div>
            </form>
        </main>
    )
}

export default Profile;
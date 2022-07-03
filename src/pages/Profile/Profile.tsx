import React from "react";
import styles from './Profile.module.css';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink } from "react-router-dom";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { logOut, refreshToken } from "../../services/actions/actions";


const Profile: React.FC = ( ) => {
    const dispatch = useDispatch();
    const [valueName, setValueName] = React.useState('');
    const [valueLogin, setValueLogin] = React.useState('');
    const [valuePassword, setValuePassword] = React.useState('');

    // const onChangeName = (e: any) => {
    //   setValueName(e.target.value)
    // }
    // const onChangelogin = (e: any) => {
    //     setValueLogin(e.target.value)
    // }
    // const onChangepassword = (e: any) => {
    //     setValuePassword(e.target.value)
    // }

    return (
        <main className={styles.root}>
            <div className={cn(styles.wrapper,  'mr-15')}>
                <div className={cn(styles.wrap, 'mb-20')}>
                    <NavLink 
                        className={cn(styles.link,styles.active_link, 'text text_type_main-medium')} 
                        to={'/profile'}
                        activeClassName='styles.active_link'
                    >
                        Профиль
                    </NavLink>
                    <NavLink 
                        className={cn(styles.link, 'text text_type_main-medium')} 
                        to={'#'}
                        activeClassName='styles.active_link'
                    >
                        История заказов
                    </NavLink>
                    <NavLink 
                        className={cn(styles.link, 'text text_type_main-medium')}
                        activeClassName='styles.active_link'
                        to={'/login'} 
                        onClick={()=>dispatch(logOut())}
                    >
                        Выход
                    </NavLink>
                </div>
                <p className={cn('text text_type_main-small', styles.text)}>В этом разделе вы можете изменить свои персональные данные</p>
            </div>
            <div className={cn(styles.block)}>
                <div className={cn(styles.wrap_input, 'mb-6')}>
                    <Input
                        type={'text'}
                        placeholder={'имя'}
                        onChange={e => setValueName(e.target.value)}
                        icon={'EditIcon'}
                        value={valueName}
                        name={'name'}
                        error={false}
                        // ref={inputRef}
                        // onIconClick={onIconClick}
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
                        // ref={inputRef}
                        // onIconClick={onIconClick}
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
                        // ref={inputRef}
                        // onIconClick={onIconClick}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                </div>
            </div>
        </main>
    )
}

export default Profile;
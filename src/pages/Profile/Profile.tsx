import React, { FormEvent, useEffect } from "react";
import styles from './Profile.module.css';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory } from "react-router-dom";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { fetchChangeUser, logOut } from "../../services/Api";
import { DELETE_USER } from "../../services/actions/actionsUser";
import { deleteCookie } from "../../utils/utils";
import { OrderFeed } from "../../components/orderFeed/OrderFeed";

interface RootState {
    userReducuer: any
}


const Profile: React.FC = ( ) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {auth} = useSelector((store: RootState) => store.userReducuer)
    const [valueName, setValueName] = React.useState<string>('');
    const [valueLogin, setValueLogin] = React.useState<string>('');
    const [valuePassword, setValuePassword] = React.useState<string>('');
    const [isForm, setIsForm] = React.useState<boolean>(true);
    const [isFeed, setIsFeed] = React.useState<boolean>(false);
    const infoRegistry: Record<string, any> = {}

    useEffect(() => {

       setValueName(auth.user.name);
       setValueLogin(auth.user.email) 

     }, []);

    const logOutUser = () => {
        (logOut())
        .then((res: {success: boolean, message: string}) => {
            if(res.success){
                dispatch({type: DELETE_USER})
                deleteCookie('accessToken')
                history.push('/login')
            }
        }
    )}

    const changeUser = (e: FormEvent) => {
        e.preventDefault()
        infoRegistry.name = valueName;
        infoRegistry.email = valueLogin;
        infoRegistry.password = valuePassword;
        fetchChangeUser(infoRegistry)
    }

    const handleForm = () => {
        setIsFeed(false)
        setIsForm(true)
    }

    const handleFeed = () => {
        setIsForm(false)
        setIsFeed(true)
    }

    return (
        <main className={styles.root}>
            <div className={cn(styles.wrapper,  'mr-15')}>
                <div className={cn(styles.wrap, 'mb-20')}>
                    <NavLink 
                        className={cn(styles.link, 'text text_type_main-medium')} 
                        to={'/profile'}
                        activeClassName='styles.active_link'
                        onClick={() => handleForm()}
                    >
                        Профиль
                    </NavLink>
                    <NavLink 
                        className={cn(styles.link, 'text text_type_main-medium')} 
                        // to={'/profile/orders'}
                        to={'#'}
                        activeClassName='styles.active_link'
                        onClick={() => handleFeed()}
                    >
                        История заказов
                    </NavLink>
                    <NavLink 
                        className={cn(styles.link, 'text text_type_main-medium')}
                        activeClassName='styles.active_link'
                        to={'/login'} 
                        onClick={()=>logOutUser()}
                    >
                        Выход
                    </NavLink>
                </div>
                {isForm && <p className={cn('text text_type_main-small', styles.text)}>В этом разделе вы можете изменить свои персональные данные</p>}
                {isFeed && <p className={cn('text text_type_main-small', styles.text)}>В этом разделе вы можете просмотреть свою историю заказов</p>}
            </div>
            {isForm &&
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
            </form>}
            {isFeed && 
                <div className={styles.feedWrap}>
                    <OrderFeed/>
                </div>
            }
        </main>
    )
}

export default Profile;
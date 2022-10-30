import React, {FC} from "react";
import cn from 'classnames';
import { Link, NavLink } from "react-router-dom";

import styles from './app-header.module.css';

import {Logo, BurgerIcon, ListIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { WSFeedActions } from "../../services/actions/actionsFeed";
import { useDispatch } from "react-redux";

 
const AppHeader: FC = () => {
    const dispatch = useDispatch()
    const handleList = () => {
    }

    const handleProfile = () => {
        dispatch({ type: WSFeedActions.onClose});
    }

 return (
     <header className={cn(styles.body)}>
         <nav className={styles.nav}>
             <div className={cn(styles.wrap)}>
                <NavLink 
                    to='/'
                    className={cn(styles.button,'p-5', 'mt-4', 'mb-4', 'mr-2')}
                >
                    <BurgerIcon type="primary" />
                    <span className={cn(styles.button, 'text text_type_main-default', 'ml-2')}>Конструктор</span>
                </NavLink>
                <NavLink 
                    to='/feed' 
                    className={cn(styles.button, 'p-5', 'mt-4', 'mb-4')}
                >
                    <ListIcon type="primary"/> 
                    <span className={cn(styles.button, 'text text_type_main-default text_color_inactive', 'ml-2')} onClick={handleList}>Лента заказов</span>
                </NavLink>
             </div>
             <div className={styles.wrapper}>
                <Link to={'/'}><Logo /></Link>
                <Link 
                    className={cn(styles.button, styles.button_nav, styles.login, 'text text_type_main-default','p-5', 'mt-4', 'mb-4')} 
                    to={'/profile'}
                    onClick={handleProfile}
                >
                    Личный кабинет
                </Link>
             </div>
         </nav>
     </header>
 )
}

export default AppHeader;
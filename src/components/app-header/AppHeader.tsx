import React, {FC} from "react";
import cn from 'classnames';
import { Link, NavLink } from "react-router-dom";

import styles from './app-header.module.css';

import {Logo, BurgerIcon, ListIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { wsFeedActions } from "../../services/actions/actionsFeed";
import { useDispatch } from "../../utils/types";

 
const AppHeader: FC = () => {
    const dispatch = useDispatch()
    const handleList = () => {
    }

    const handleProfile = () => {
        dispatch({ type: wsFeedActions.onClose});
    }

 return (
     <header className={cn(styles.body)}>
         <nav className={styles.nav}>
             <div className={cn(styles.wrap)}>
                <NavLink 
                    to='/'
                    className={cn(styles.button,'p-5', 'mt-4', 'mb-4', 'mr-2')}
                    activeClassName={styles.button_active}
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
                    className={cn(styles.button, styles.login, 'text text_type_main-default','p-5', 'mt-4', 'mb-4')} 
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
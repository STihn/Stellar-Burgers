import React from "react";
import cn from 'classnames';

import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import Button from "../button/Button";

import styles from './app-header.module.css';

const Burger = () => {
    return (
        <BurgerIcon type="primary" />
    )
}

const IconList = () => {
    return (
        <ListIcon type="primary" />
    )
}

const IconProfile = () => {
    return (
        <ProfileIcon type="primary" />
    )
}
 
const AppHeader = () => {
 return (
     <header className={cn(styles.body)}>
         <nav className={styles.nav}>
             <div className={cn(styles.wrap)}>
                <Button className={cn(styles.button, 'text text_type_main-default', 'p-5', 'mt-4', 'mb-4', 'mr-2')} text={'Конструктор'} icon={Burger()}/>
                <Button className={cn(styles.button, styles.button_nav, 'text text_type_main-default' ,'p-5', 'mt-4', 'mb-4')} text={'Лента заказов'} icon={IconList()}/>
             </div>
             <div className={styles.wrapper}>
                <Logo />
                <Button className={cn(styles.button, styles.button_nav, styles.login, 'text text_type_main-default','p-5', 'mt-4', 'mb-4')} text={'Личный кабинет'} icon={IconProfile()}/>
             </div>
         </nav>

     </header>
 )
}

export default AppHeader;
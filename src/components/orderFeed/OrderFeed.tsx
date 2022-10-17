import React, { useState } from "react";
import styles from './OrderFeed.module.css';
import cn from "classnames";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/Modal";
import { FeedPage } from "../feedPage/FeedPage";



export const OrderFeed = () => {
    const [isOpen, setOpen] = useState(false);

    const handleFeedId = () => {
        setOpen(true)
        // history.push('/feed/:id')
    }

    const handleClose = () => {
        setOpen(false)
        // history.push('/')
        // dispatch({type: DELETE_INGREDIENT_DETAILS, IngredientDetails: []})
        // delete localStorage.modal;
    }

    return (
        <div className={cn(styles.tape)}>
            <div className={cn(styles.wrap, 'p-6', 'mb-4', 'mr-2')} onClick={handleFeedId}>
                <div className={cn(styles.inner, 'mb-6')}>
                    <span className={cn(styles.number, "text text_type_digits-default")}>#034535</span>
                    <span className={cn(styles.date, "text text_type_main-default text_color_inactive")}>Сегодня, 16:20 i-GMT+3</span>
                </div>
                <p className={cn(styles.text, "text text_type_main-medium", 'mb-6')}>Death Star Starship Main бургер</p>
                <div className={styles.blockIcons}>
                    <div className={cn(styles.icon, 'mr-6')}>{'icon'}</div>
                    <div className={styles.price}>
                        <span className={cn(styles.total, "text text_type_digits-medium", 'mr-2')}>480</span>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>
            <div className={cn(styles.wrap, 'p-6', 'mb-4', 'mr-2')}>
                <div className={cn(styles.inner, 'mb-6')}>
                    <span className={cn(styles.number, "text text_type_digits-default")}>#034535</span>
                    <span className={cn(styles.date, "text text_type_main-default text_color_inactive")}>Сегодня, 16:20 i-GMT+3</span>
                </div>
                <p className={cn(styles.text, "text text_type_main-medium", 'mb-6')}>Death Star Starship Main бургер</p>
                <div className={styles.blockIcons}>
                    <div className={cn(styles.icon, 'mr-6')}>{'icon'}</div>
                    <div className={styles.price}>
                        <span className={cn(styles.total, "text text_type_digits-medium", 'mr-2')}>480</span>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>
            <div className={cn(styles.wrap, 'p-6', 'mb-4', 'mr-2')}>
                <div className={cn(styles.inner, 'mb-6')}>
                    <span className={cn(styles.number, "text text_type_digits-default")}>#034535</span>
                    <span className={cn(styles.date, "text text_type_main-default text_color_inactive")}>Сегодня, 16:20 i-GMT+3</span>
                </div>
                <p className={cn(styles.text, "text text_type_main-medium", 'mb-6')}>Death Star Starship Main бургер</p>
                <div className={styles.blockIcons}>
                    <div className={cn(styles.icon, 'mr-6')}>{'icon'}</div>
                    <div className={styles.price}>
                        <span className={cn(styles.total, "text text_type_digits-medium", 'mr-2')}>480</span>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>
            <div className={cn(styles.wrap, 'p-6', 'mb-4', 'mr-2')}>
                <div className={cn(styles.inner, 'mb-6')}>
                    <span className={cn(styles.number, "text text_type_digits-default")}>#034535</span>
                    <span className={cn(styles.date, "text text_type_main-default text_color_inactive")}>Сегодня, 16:20 i-GMT+3</span>
                </div>
                <p className={cn(styles.text, "text text_type_main-medium", 'mb-6')}>Death Star Starship Main бургер</p>
                <div className={styles.blockIcons}>
                    <div className={cn(styles.icon, 'mr-6')}>{'icon'}</div>
                    <div className={styles.price}>
                        <span className={cn(styles.total, "text text_type_digits-medium", 'mr-2')}>480</span>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>
            {isOpen && 
                <Modal onClose={handleClose} text={'#034533'} feedPage>
                    <FeedPage/>
                </Modal>
            }
        </div>
    )
}
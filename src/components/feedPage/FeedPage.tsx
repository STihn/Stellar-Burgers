import React from "react";
import styles from './FeedPage.module.css';
import cn from "classnames";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export const FeedPage = () => {
    return (
        <section className={cn(styles.root, 'p-10')}>
            <h1 className={cn(styles.title, "text text_type_main-medium", 'mb-3')}>Black Hole Singularity острый бургер</h1>
            <p className={cn(styles.text, 'mb-15', "text text_type_main-default")}>Выполнен</p>
            <div className={'mb-10'}>
                <p className={cn(styles.subtitle, "text text_type_main-default", 'mb-6')}>Состав:</p>
                <div className={styles.wrap}>
                    <div className={cn(styles.block, 'mr-6')}>
                        <div className={cn(styles.image, 'mr-4')}>icon</div>
                        <p className={cn(styles.blockText,"text text_type_main-medium", 'mr-4')}>булка</p>
                        <p className={cn(styles.price,"text text_type_main-medium")}>2 x 20</p>
                        <CurrencyIcon type="primary" />
                    </div>
                    <div className={cn(styles.block, 'mr-6')}>
                        <div className={cn(styles.image, 'mr-4')}>icon</div>
                        <p className={cn(styles.blockText,"text text_type_main-medium", 'mr-4')}>булка</p>
                        <p className={cn(styles.price,"text text_type_main-medium")}>2 x 20</p>
                        <CurrencyIcon type="primary" />
                    </div>
                    <div className={cn(styles.block, 'mr-6')}>
                        <div className={cn(styles.image, 'mr-4')}>icon</div>
                        <p className={cn(styles.blockText,"text text_type_main-medium", 'mr-4')}>булка</p>
                        <p className={cn(styles.price,"text text_type_main-medium")}>2 x 20</p>
                        <CurrencyIcon type="primary" />
                    </div>
                    <div className={cn(styles.block, 'mr-6')}>
                        <div className={cn(styles.image, 'mr-4')}>icon</div>
                        <p className={cn(styles.blockText,"text text_type_main-medium", 'mr-4')}>булка</p>
                        <p className={cn(styles.price,"text text_type_main-medium")}>2 x 20</p>
                        <CurrencyIcon type="primary" />
                    </div>
                    <div className={cn(styles.block, 'mr-6')}>
                        <div className={cn(styles.image, 'mr-4')}>icon</div>
                        <p className={cn(styles.blockText,"text text_type_main-medium", 'mr-4')}>булка</p>
                        <p className={cn(styles.price,"text text_type_main-medium")}>2 x 20</p>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>
            <div className={styles.footer}>
                <p className={cn(styles.date, "text text_type_main-default text_color_inactive")}>Вчера, 13:50 i-GMT+3</p>
                <div className={styles.wrapper}>
                    <span className={cn(styles.total, "text text_type_digits-default")}>456</span>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </section>
    )
}
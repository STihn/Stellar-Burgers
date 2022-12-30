import React from "react";
import styles from './ProfileOrders.module.css';
import cn from 'classnames';
import { ProfileNavigation } from "../../components/profileNavigation/ProfileNavigation";
import { OrderFeed } from "../../components/orderFeed/OrderFeed";

export const ProfileOrders = () => {
    return (
        <main className={styles.root}>
            <div className={cn(styles.wrapper,  'mr-15')}>
                <div className={cn(styles.wrap, 'mb-20')}>
                {<ProfileNavigation/>}
                </div>
                <p className={cn('text text_type_main-small', styles.text)}>В этом разделе вы можете просмотреть свою историю заказов</p>
            </div>
            <div className={styles.feedWrap}>
                    <OrderFeed profile/>
            </div>
        </main>
    )
}
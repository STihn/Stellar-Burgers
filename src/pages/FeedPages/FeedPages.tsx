import React, { useEffect, useState } from "react";
import styles from './FeedPages.module.css';
import cn from 'classnames';
import { OrderFeed } from "../../components/orderFeed/OrderFeed";
import { useDispatch, useSelector } from "../../utils/types";
import {wsFeedActions} from '../../services/actions/actionsFeed'


export const FeedPages = () => {
    const dispatch = useDispatch();
    const {feedList} = useSelector((store) => store.FeedReducer);
    let col = false;
    let count = 0;
    useEffect(() => {
        dispatch({type: wsFeedActions.wsConnect, action: `wss://norma.nomoreparties.space/orders/all`})

        return () => {
            dispatch({type: wsFeedActions.wsDisconnect, action: `wss://norma.nomoreparties.space/orders/all`})
        }
    }, [])

    const tableDone = () => {
        if(feedList !== null && feedList.success === true) {
            return feedList.orders.map((item) => {
                if(item.status === 'done') {
                    count++;
                    if(count <= 10) {
                        col = true;
                        return (
                            <p className={cn(styles.textTotals, styles.color, "text text_type_main-small")} key={item._id}>
                                {item.number}
                            </p>
                        )
                    }    
                }
            })
        }
    }

    return (
        <main className={styles.root}>
            <h1 className={cn(styles.title, 'text text_type_main-large')}>
                Лента заказов
            </h1>
            <section className={cn(styles.wrapper, 'mb-4')}>
                <div className={styles.tapeWrap}>
                    {<OrderFeed/>}
                </div>
                <div className={styles.totals}>
                    <div className={cn(styles.wrapTotals, 'mb-15')}>
                        <div className={styles.block}>
                            <p className={cn(styles.subtitle, "text text_type_main-large", 'mb-6')}>Готовы:</p>
                            <div className={cn(styles.wrap)}>
                                <div className={styles.column}>
                                    {tableDone()}
                                </div>
                                {col &&
                                    <div className={styles.column}>
                                        {tableDone()}
                                    </div>
                                }
                            </div>
                        </div>
                        <div className={styles.block}>
                            <p className={cn(styles.subtitle, "text text_type_main-large", 'mb-6')}>В работе:</p>
                            <p className={cn(styles.textTotals, "text text_type_main-small")}>
                                
                            </p>
                        </div>
                    </div>
                    <p className={cn(styles.subtitle, "text text_type_main-large")}>Выполнено за все время:</p>
                    <p className={cn(styles.totalPrice, "text text_type_digits-large", 'mb-15')}>{feedList !== null ? feedList.total : 0}</p>
                    <p className={cn(styles.subtitle, "text text_type_main-large")}>Выполнено за сегодня:</p>
                    <p className={cn(styles.totalPrice, "text text_type_digits-large", 'mb-15')}>{feedList !== null ? feedList.totalToday : 0}</p>
                </div>
            </section>
        </main>
    )
}
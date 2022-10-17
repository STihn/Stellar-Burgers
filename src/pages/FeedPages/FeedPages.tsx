import React, { useEffect, useState } from "react";
import styles from './FeedPages.module.css';
import cn from 'classnames';
import { OrderFeed } from "../../components/orderFeed/OrderFeed";
import { wsUrl } from "../../services/WebSocket";
import { useDispatch } from "react-redux";
import {WSFeedActions} from '../../services/actions/actionsFeed'

export const FeedPages = () => {
    const dispatch = useDispatch();
    useEffect(() => {
            dispatch({type: WSFeedActions.WsConnect, action: `${wsUrl}/orders/all`})
    }, [])

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
                            <p className={cn(styles.textTotals, styles.color, "text text_type_main-small")}>
                                334545645
                            </p>
                            <p className={cn(styles.textTotals, styles.color, "text text_type_main-small")}>
                                334545645
                            </p>
                            <p className={cn(styles.textTotals, styles.color, "text text_type_main-small")}>
                                334545645
                            </p>
                            <p className={cn(styles.textTotals, styles.color, "text text_type_main-small")}>
                                334545645
                            </p>
                            <p className={cn(styles.textTotals, styles.color, "text text_type_main-small")}>
                                334545645
                            </p>
                            <p className={cn(styles.textTotals, styles.color, "text text_type_main-small")}>
                                334545645
                            </p>
                        </div>
                        <div className={styles.block}>
                            <p className={cn(styles.subtitle, "text text_type_main-large", 'mb-6')}>В работе:</p>
                            <p className={cn(styles.textTotals, "text text_type_main-small")}>
                                334545645
                            </p>
                            <p className={cn(styles.textTotals, "text text_type_main-small")}>
                                334545645
                            </p>
                            <p className={cn(styles.textTotals, "text text_type_main-small")}>
                                334545645
                            </p>
                            <p className={cn(styles.textTotals, "text text_type_main-small")}>
                                334545645
                            </p>
                        </div>
                    </div>
                    <p className={cn(styles.subtitle, "text text_type_main-large")}>Выполнено за все время:</p>
                    <p className={cn(styles.totalPrice, "text text_type_digits-large", 'mb-15')}>28 752</p>
                    <p className={cn(styles.subtitle, "text text_type_main-large")}>Выполнено за сегодня:</p>
                    <p className={cn(styles.totalPrice, "text text_type_digits-large", 'mb-15')}>288</p>
                </div>
            </section>
        </main>
    )
}
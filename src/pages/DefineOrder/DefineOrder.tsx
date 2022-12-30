import React from "react";
import styles from './DefineOrder.module.css';
import cn from "classnames";
import { FeedPage } from "../../components/feedPage/FeedPage";


export const DefineOrder = () => {

    return (
        <section className={styles.root}>
            <h1 className={cn(styles.title, "text text_type_digits-default")}>#034535</h1>
            <FeedPage/>
        </section>
    )
}
import React, { useEffect } from "react";
import styles from './FeedPage.module.css';
import cn from "classnames";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IQuantityOrder, useDispatch, useSelector } from "../../utils/types";
import { changeDate, getCookie, quantityOrder, showInfoOrder } from "../../utils/utils";
import { fetchIngridients, INGREDIENT_DETAILS } from "../../services/actions/actions";
import { wsFeedActions } from "../../services/actions/actionsFeed";
import { useRouteMatch } from "react-router-dom";
import { IFetchIngridient, IUseRouteMatch, IOrderObj } from '../../utils/types';
import { WS_BASE_URL } from "../../services/WebSocket";
import { v4 as uuidv4 } from 'uuid';
import { isEmpty } from "lodash";


export const FeedPage = () => {
    const dispatch = useDispatch();
    const {params} = useRouteMatch<IUseRouteMatch>();

    const {feedList} = useSelector((store) => store.FeedReducer);
    const {BurgerIngredients, IngredientDetails} = useSelector((store) => store.burgerReducer);
    const {number, name, status, ingredients, createdAt} = IngredientDetails as IOrderObj

    // useEffect(() => {
    //     if(params.id && feedList) {
    //         feedList.orders.forEach((item: { _id: string; }) => {
    //             if(params.id === item._id) {
    //                 dispatch({type: INGREDIENT_DETAILS, IngredientDetails: item});
    //             }
    //         })
    //     }

    // }, [feedList])

    return (
        <section className={cn(styles.root, 'p-10')}>
            {params.id && <p className={cn(styles.number,'mt-6', 'mb-6', "text text_type_main-medium")}>#{number}</p> }
            <h1 className={cn(styles.title, "text text_type_main-medium", 'mb-3')}>{name}</h1>
            <p className={cn(styles.text, 'mb-6', "text text_type_main-default")}>{status}</p>
            <div className={'mb-10'}>
                <p className={cn(styles.subtitle, "text text_type_main-default", 'mb-6')}>Состав:</p>
                <div className={styles.wrap}>
                    {quantityOrder(showInfoOrder(ingredients, BurgerIngredients, 'modal') as IFetchIngridient[]).map((item: IQuantityOrder) => {
                            const idx = uuidv4();
                            return (
                                <div className={cn(styles.block, 'mr-6')} key={idx}>
                                    <img className={cn(styles.img)} src={item.image} alt={item.name}  />
                                    <p className={cn(styles.blockText,"text text_type_main-medium", 'mr-4')}>{item.name}</p>
                                    <p className={cn(styles.price,"text text_type_main-medium")}>{`${item.quantity} x ${item.price}`}</p>
                                    <CurrencyIcon type="primary" />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className={styles.footer}>
                <p className={cn(styles.date, "text text_type_main-default text_color_inactive")}>{changeDate(createdAt)} i-GMT+3</p>
                <div className={styles.wrapper}>
                    <span className={cn(styles.total, "text text_type_digits-default")}>
                        {!isEmpty(showInfoOrder(ingredients, BurgerIngredients, 'price')) && (showInfoOrder(ingredients, BurgerIngredients, 'price') as number[]).reduce((item: number, current: number) => {return item + current})}
                    </span>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </section>
    )
}
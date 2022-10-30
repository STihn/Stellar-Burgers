import React, { useCallback, useEffect, useMemo } from "react";
import styles from './FeedPage.module.css';
import cn from "classnames";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { changeDate, showInfoOrder } from "../../utils/utils";
import { fetchIngridients, INGREDIENT_DETAILS } from "../../services/actions/actions";
import { WSFeedActions } from "../../services/actions/actionsFeed";
import { useRouteMatch } from "react-router-dom";
import { IUseRouteMatch } from '../../utils/types';
interface RootState {
    FeedReducer: any,
    burgerReducer: any
}


export const FeedPage = () => {
    const dispatch = useDispatch();
    const {params} = useRouteMatch<IUseRouteMatch>();
    useEffect(() => {
        dispatch(fetchIngridients())
        dispatch({type: WSFeedActions.WsConnect, action: `wss://norma.nomoreparties.space/orders/all`})
     }, []);

    const {feedList} = useSelector((store: RootState) => store.FeedReducer);
    const {BurgerIngredients} = useSelector((store: RootState) => store.burgerReducer);
    const {IngredientDetails} = useSelector((store: RootState) => store.burgerReducer);

    useEffect(()=> {
        if(params.id && feedList.length !== 0) {
            feedList.orders.forEach((item: any) => {
                if(params.id === item._id) {
                    dispatch({type: INGREDIENT_DETAILS, IngredientDetails: item});
                }
            })
        }

    }, [feedList])

    return (
        <section className={cn(styles.root, 'p-10')}>
            <React.Fragment>
                <h1 className={cn(styles.title, "text text_type_main-medium", 'mb-3')}>{IngredientDetails.name}</h1>
                <p className={cn(styles.text, 'mb-6', "text text_type_main-default")}>{IngredientDetails.status}</p>
                <div className={'mb-10'}>
                    <p className={cn(styles.subtitle, "text text_type_main-default", 'mb-6')}>Состав:</p>
                    <div className={styles.wrap}>
                        {(IngredientDetails.length !== 0 && BurgerIngredients.length !== 0) &&
                            showInfoOrder(IngredientDetails.ingredients, BurgerIngredients, 'modal').map((item: any) => {
                                return (
                                    <div className={cn(styles.block, 'mr-6')}>
                                        <img className={cn(styles.img)} src={item.image} alt={item.name}  />
                                        <p className={cn(styles.blockText,"text text_type_main-medium", 'mr-4')}>{item.name}</p>
                                        <p className={cn(styles.price,"text text_type_main-medium")}>{item.price}</p>
                                        <CurrencyIcon type="primary" />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className={styles.footer}>
                    <p className={cn(styles.date, "text text_type_main-default text_color_inactive")}>{changeDate(IngredientDetails.createdAt)} i-GMT+3</p>
                    <div className={styles.wrapper}>
                        <span className={cn(styles.total, "text text_type_digits-default")}>
                            {(IngredientDetails.length !== 0 && BurgerIngredients.length !== 0) && showInfoOrder(IngredientDetails.ingredients, BurgerIngredients, 'price').reduce((item: any, current: any) => {return item + current})}
                        </span>
                        <CurrencyIcon type="primary" />
                    </div>
                </div>
            </React.Fragment>
        </section>
    )
}
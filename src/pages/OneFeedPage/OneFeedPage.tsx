import React, { useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { FeedPage } from "../../components/feedPage/FeedPage";
import { FETCH_INGRIDIENTS, INGREDIENT_DETAILS } from "../../services/actions/actions";
import { WS_MESSAGE } from "../../services/actions/actionsFeed";
import { IUseRouteMatch, useDispatch } from "../../utils/types";
import styles from './OneFeedPage.module.css';

export const OneFeedPage = () => {
    const dispatch = useDispatch();
    const {params} = useRouteMatch<IUseRouteMatch>();

    useEffect(() => {
        const feedList = JSON.parse(localStorage.getItem('feedList') as string)
        const BurgerIngredients = JSON.parse(localStorage.getItem('BurgerIngredients') as string)
        dispatch({ type: WS_MESSAGE, payload: feedList });
        dispatch({type: FETCH_INGRIDIENTS, BurgerIngredients: BurgerIngredients})

        if(params.id && feedList) {
            feedList.orders.forEach((item: { _id: string; }) => {
                if(params.id === item._id) {
                    dispatch({type: INGREDIENT_DETAILS, IngredientDetails: item});
                }
            })
        }

    }, [])

    return (
        <main className={styles.root}>
            <FeedPage/>
        </main>
    )
}
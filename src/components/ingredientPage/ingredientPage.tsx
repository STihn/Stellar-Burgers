import React, { useEffect } from "react";
import cn from 'classnames';
import styles from './ingredientPage.module.css'
import IngredientDetails from "../ingredientDetails/IngredientDetails";
import { useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchIngridients, INGREDIENT_DETAILS } from "../../services/actions/actions";

interface RootState {
     burgerReducer: any
}

const IngredientPage = () => {

    useEffect(() => {
        dispatch(fetchIngridients())
    }, [])

    const {params}: any = useRouteMatch();
    const dispatch = useDispatch();
    const {BurgerIngredients} = useSelector((store: RootState) => store.burgerReducer);

    useEffect(()=> {
        BurgerIngredients.forEach((item: any) => {
            if(params.id === item._id) {
                dispatch({type: INGREDIENT_DETAILS, IngredientDetails: item});
            }
        })
    }, [BurgerIngredients])


    return (
        <section className={styles.root}>
            <h1 className={cn(styles.title, 'text text_type_main-large')}>Детали ингредиента</h1>
             <IngredientDetails/>
        </section>
    )
}

export default IngredientPage;



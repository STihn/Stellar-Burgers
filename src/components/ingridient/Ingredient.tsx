import React from "react";
import cn from 'classnames';
import { useDrag } from "react-dnd";

import styles from './ingredient.module.css';
import {IData} from '../../utils/types';

import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import { IItem } from "../burgerIngredients/BurgerIngredients";
import { IIngredients } from "../burgerConstructor/BurgerConstructor";


interface IFindIngredients extends IIngredients {
    count: number
}
interface IProps {
    data: IData,
    counter: Array<IFindIngredients>
    onClick: () => void
}



const Ingredient = (props: IProps) => {
    const {image, type, price, name, _id} = props.data;
    const {counter} = props;

    const count = counter?.length === 0 ? 0 : counter.length;
    
    const [{isDrag}, dragRef] = useDrag({
        type: `ingridient`,
        item: {image, type, price, name, _id},
        collect: monitor => ({
            isDrag: monitor.isDragging(),
        }),  
    })

    let result = 0

    const findIdIngridient = () => {
        if(type === 'bun') {
            result += 2
            return _id === counter[0]._id
        }
        else {
            counter.map((item) => {
                if(item._id === _id) {
                    result += item.count
                }
                return null
            })
            return counter.find((item) => item._id === _id)
        }
    }


    return (
        <section className={cn(styles.wrapper, 'mb-10')} onClick={props.onClick} ref={dragRef}>
            {(count > 0 && findIdIngridient()) &&  <Counter count={result} size="small" />}
            <img className={cn(styles.img, 'ml-4')} src={image} alt={type} />
            <div className={cn(styles.wrap, 'mt-1', 'mb-1')}>
                <p className={cn(styles.price, 'text text_type_digits-default')}>{price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={cn(styles.text, 'text text_type_main-default')}>{name}</p>
        </section>
    )
}
export default Ingredient;
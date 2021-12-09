import React from "react";
import cn from 'classnames';

import styles from './ingredient.module.css';
import {IData} from '../../utils/types';

import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';

interface IProps {
    data: IData,
    onClick: () => void
}


const Ingredient = (props: IProps) => {
    const {image, type, price, name} = props.data;
    return (
        <section className={cn(styles.wrapper, 'mb-10')} onClick={props.onClick}>
            <Counter count={1} size="small" />
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
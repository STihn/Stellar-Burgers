import React from "react";
import cn from 'classnames';

import styles from './ingredientDetails.module.css';
import {IData} from '../../utils/types';
import { useSelector, useDispatch } from 'react-redux';
interface IProps {
    state: IData;
    burgerReducer: any
}

const IngredientDetails = () => {
    
    const {image, type, name, fat, proteins, carbohydrates, calories} = useSelector((state: IProps) => state.burgerReducer.IngredientDetails);
    
    return (
        <div className={styles.wrapper}>
            <img src={image} alt={type} className={cn(styles.image, 'mb-4')}/>
            <p className={cn(styles.head, "text text_type_main-small", 'mb-8')}>{name}</p>
            <div className={cn(styles.wrap, 'mb-15')}>
                <div className={cn(styles.inner, 'mr-5')}>
                    <p className={cn(styles.text, "text text_type_main-default")}>Калории,ккал</p>
                    <p className={cn(styles.property, "text text_type_digits-default")}>{calories}</p>
                </div>
                <div className={cn(styles.inner, 'mr-5')}>
                    <p className={cn(styles.text, "text text_type_main-default")}>Белки, г</p>
                    <p className={cn(styles.property, "text text_type_digits-default")}>{proteins}</p>
                </div>
                <div className={cn(styles.inner, 'mr-5')}>
                    <p className={cn(styles.text, "text text_type_main-default")}>Жиры, г</p>
                    <p className={cn(styles.property, "text text_type_digits-default")}>{fat}</p>
                </div>
                <div className={styles.inner}>
                    <p className={cn(styles.text, "text text_type_main-default")}>Углеводы, г</p>
                    <p className={cn(styles.property, "text text_type_digits-default")}>{carbohydrates}</p>
                </div>
            </div>
        </div>

    )
}
export default IngredientDetails;
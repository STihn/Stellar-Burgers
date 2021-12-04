import React from  'react';
import cn from 'classnames';
import styles from '../orderDetails/orderDetails.module.css';
import imageModal from '../../images/done.gif';

const OrderDetails = () => {

    return (
        <React.Fragment>
            <h2 className={cn(styles.title, 'text text_type_digits-large', 'mt-8', 'mb-8')}>034536</h2>
            <p className={cn(styles.subtitle, 'mb-15', 'text text_type_main-default')}>идентификатор заказа</p>
            <img src={imageModal} alt='done' className={cn(styles.image, 'mb-15')}/>
            <p className={cn(styles.text, 'mb-2', 'text text_type_main-default')}>Ваш заказ начали готовить</p>
            <p className={cn(styles.text, styles.text_dark, 'mb-30', 'text text_type_main-default')}>Дождитесь готовности на орбитальной станции</p>
        </React.Fragment>

    )
}
export default OrderDetails;
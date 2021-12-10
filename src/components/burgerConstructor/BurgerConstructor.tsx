import React from "react";
import cn from 'classnames';

import {ConstructorElement, DragIcon, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burgerConstructor.module.css';

import Button from "../button/Button";
import Modal from "../modal/Modal";
import OrderDetails from "../orderDetails/OrderDetails";

const BurgerConstructor = () => {
    const [isOpen, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }
     
    return (
        <React.Fragment>
            <section className={styles.body}>
                <div className={cn(styles.block,'ml-4', 'mr-4','mt-25', 'mb-10')}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
                    />
                    <div className={cn(styles.wrapper, 'mt-4', 'mb-4')}>
                        <div className={cn(styles.wrap, 'mb-4')}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                text="Говяжий метеорит (отбивная)"
                                price={3000}
                                thumbnail={"https://code.s3.yandex.net/react/code/meat-04.png"}
                            />
                        </div>
                        <div className={cn(styles.wrap, 'mb-4')}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                text="Говяжий метеорит (отбивная)"
                                price={3000}
                                thumbnail={"https://code.s3.yandex.net/react/code/meat-04.png"}
                            />
                        </div>
                        <div className={cn(styles.wrap, 'mb-4')}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                text="Говяжий метеорит (отбивная)"
                                price={3000}
                                thumbnail={"https://code.s3.yandex.net/react/code/meat-04.png"}
                            />
                        </div>
                        <div className={cn(styles.wrap, 'mb-4')}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                text="Филе Люминесцентного тетраодонтимформа"
                                price={988}
                                thumbnail={"https://code.s3.yandex.net/react/code/meat-03.png"}
                            />
                        </div>
                        <div className={cn(styles.wrap, 'mb-4')}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                text="Филе Люминесцентного тетраодонтимформа"
                                price={988}
                                thumbnail={"https://code.s3.yandex.net/react/code/meat-03.png"}
                            />
                        </div>
                        <div className={cn(styles.wrap)}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                text="Филе Люминесцентного тетраодонтимформа"
                                price={988}
                                thumbnail={"https://code.s3.yandex.net/react/code/meat-03.png"}
                            />
                        </div>  
                    </div>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={200}
                        thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
                    />
                </div>
                <div className={cn(styles.total, 'mr-4')}>
                    <span className={cn(styles.price, 'text text_type_digits-default')}>200</span>
                    <CurrencyIcon type="primary" />
                    <Button text={'оформить заказ'} className={cn(styles.button, 'ml-10', 'text text_type_main-default')} onClick={handleOpen}/>
                </div>
            </section>
            {isOpen && 
                <Modal onClose={handleClose}>
                    <OrderDetails />
                </Modal>
            }
        </React.Fragment>
    )
}

export default BurgerConstructor;
import React, { useReducer } from "react";
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from "react-dnd";

import {ConstructorElement, DragIcon, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burgerConstructor.module.css';

import Button from "../button/Button";
import Modal from "../modal/Modal";
import OrderDetails from "../orderDetails/OrderDetails";
import { UPDATE_CONSTRUCTOR } from '../../services/actions/actions';

interface RootState {
    burgerConstructorReducer: any,
}

const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const {BurgerConstructor} = useSelector((store: RootState) => store.burgerConstructorReducer);
    console.log(BurgerConstructor, 'hello')
    const total: number = 0;

    const [isOpen, setOpen] = React.useState(false);
    // const [state, dispatch] = useReducer(reducer, total)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const reducer = (state: any, action: any) => {
        switch(action) {
            
        }
    }

    const [, dropTarget] = useDrop({
        accept: 'ingridient',
        drop(data: any) {
            console.log(data)
            // BurgerConstructor.filter((element: any) => element.id === data._id)
            dispatch({type: UPDATE_CONSTRUCTOR, data})
        }
    })

    const bunConstructor = (type: any) => {
        if(BurgerConstructor.length === 0 || BurgerConstructor.forEach((item: any) => item.type !== 'bun')) {
            return (
                <div className={cn(styles.wrap, type === 'top' ? styles.wrap_top : styles.wrap_button)}>
                    { type === 'top' ? <p>булка верх</p> : <p>булка низ</p>}
                </div>
            )
        }
        else if(BurgerConstructor.some((item: any) => item.type === 'bun')) {
            console.log('12')
            return BurgerConstructor.map((item: any) => {
                return(
                    <div className={cn(styles.wrap)}  key={item._id}>
                        <ConstructorElement
                        type={type}
                        isLocked={true}
                        text={`${item.name} ${type === 'top'? '(верх)':'(низ)'} `}
                        price={item.price}
                        thumbnail={item.image}
                        />
                    </div>
                )
            })
            } 


        // BurgerConstructor.map((item: any) => {
            // console.log('item')
            
            // if (item.type !== 'bun') {
            //     return(
            //         <div className={cn(styles.wrap, styles.wrap_top)}>
            //             <p>булка верх2</p>
            //         </div>)
            // };
        // })
    }
     
    return (
        <React.Fragment>
            <section className={styles.body}>
                <div className={cn(styles.block,'ml-4', 'mr-4','mt-25', 'mb-10')} ref={dropTarget}>

                    {bunConstructor('top')}

                    <div className={cn(styles.wrapper, styles.wrap_main, 'mt-4', 'mb-4')}>
                        <p>начинка у бургерa</p>
                        {/* <div className={cn(styles.wrap, 'mb-4')}>
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
                        </div>   */}
                    </div>
                    {/* <div className={cn(styles.wrap, styles.wrap_button)}>
                        <p>булка низ</p>
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text="Краторная булка N-200i (низ)"
                            price={200}
                            thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
                        />
                    </div> */}
                    {bunConstructor('bottom')}
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
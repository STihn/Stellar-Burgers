import React, {useCallback, useState } from "react";
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop, useDrag } from "react-dnd";
import { v4 as uuidv4 } from 'uuid';
import { debounce } from "lodash";

import {ConstructorElement, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burgerConstructor.module.css';

import Button from "../button/Button";
import Modal from "../modal/Modal";
import OrderDetails from "../orderDetails/OrderDetails";
import ConstructorCard from '../constructorCard/constructorCard';
import { UPDATE_CONSTRUCTOR_BUN,
    UPDATE_CONSTRUCTOR_BODY, 
    INCREMENT_BUN, 
    INCREMENT_BODY, 
    DECREMENT_BUN, 
    DECREMENT_BODY, 
    DELETE_CONSTRUCTOR_BODY,
    fetchOrderDetails,
    DND_UPDATE_CONSTRUCTOR_BODY,
    CLEAR_ORDER_DETAILS
} from '../../services/actions/actions';
import { getCookie } from "../../utils/utils";
import { useHistory } from "react-router-dom";
import {IIngredients} from '../../utils/types'

interface RootState {
    burgerConstructorReducer: any,
    totalPriceReducer: any
}


const BurgerConstructor: React.FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {BurgerConstructorBun} = useSelector((store: RootState) => store.burgerConstructorReducer);
    const {BurgerConstructorBody} = useSelector((store: RootState) => store.burgerConstructorReducer);
    const {totalPrice} = useSelector((store: RootState) => store.totalPriceReducer);
    const token = getCookie('accessToken');

    const [isOpen, setOpen] = React.useState<boolean>(false);

    const handleOpen = () => {
        if(!token) {
            history.push('/login')
        }else {
            setOpen(true)
            const arrMenu = BurgerConstructorBun.concat(BurgerConstructorBody);
            const data = {
                "ingredients": arrMenu.map((item: IIngredients) => {
                    return item._id;
                })
            } as unknown as string[]
            dispatch(fetchOrderDetails(data))
        }

    }

    const handleClose = () => {
        setOpen(false)
        dispatch({type: CLEAR_ORDER_DETAILS})
    }

    const deleteIngredient = (id: string) => {
        BurgerConstructorBody.map((item: IIngredients, index: number) => {
            if(item.id === id) {
                dispatch({type: DELETE_CONSTRUCTOR_BODY, index})
                dispatch({type: DECREMENT_BODY, item})
            }
        })
    }

    const [, dropTarget] = useDrop({
        accept: 'ingridient',
        drop(data: IIngredients) {
            data.id = uuidv4();
            data.count = 0;
            if(data.type === 'bun') {
                data.count++;
                dispatch({type: UPDATE_CONSTRUCTOR_BUN, data});
                if(BurgerConstructorBun.length === 0) {
                    dispatch({type: INCREMENT_BUN, data})
                }else {
                    BurgerConstructorBun.map((element: IIngredients) => {
                        if(element._id !== data._id) {
                            dispatch({type: DECREMENT_BUN, BurgerConstructorBun});
                            dispatch({type: INCREMENT_BUN, data});
                    }
                })
                }
            }
            if(data.type === 'main' || data.type === 'sauce') {
                data.count++;
                const {price} = data;
                dispatch({type: UPDATE_CONSTRUCTOR_BODY, data})
                dispatch({type: INCREMENT_BODY, price})
            }
        }
    })

    const moveCard = (dragIdex: number, hoverIndex: number) => {
        const dragCard = BurgerConstructorBody[dragIdex];
        const newCards = BurgerConstructorBody;
        newCards.splice(dragIdex, 1);
        newCards.splice(hoverIndex, 0, dragCard);
        dispatch({type: DND_UPDATE_CONSTRUCTOR_BODY, newCards})
        
    }
    const moveRow = useCallback(debounce(moveCard, 300), [BurgerConstructorBody]);

    const bunConstructor = (type: 'top' | 'bottom' | undefined) => {
        if(BurgerConstructorBun.length === 0) {
            return (
                <div className={cn(styles.wrap, type === 'top' ? styles.wrap_top : styles.wrap_button)}>
                    { type === 'top' ? <p>булка верх</p> : <p>булка низ</p>}
                </div>
            )
        }
        else {
            return BurgerConstructorBun.map((item: IIngredients) => {
                return(
                    <div className={cn(styles.wrap)}  key={item.id}>
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
    }

    return (
        <React.Fragment>
            <section className={styles.body}>
                <div className={cn(styles.block,'ml-4', 'mr-4','mt-25', 'mb-10')} ref={dropTarget}>
                    {bunConstructor('top')}
                    <div className={cn(styles.wrapper, BurgerConstructorBody.length === 0 ? styles.wrap_main : null, 'mt-4', 'mb-4')}>
                        {BurgerConstructorBody.length === 0 ?
                            <p>начинка у бургерa</p> :
                            BurgerConstructorBody.map((item: IIngredients, index: number) => {
                                return(
                                    <ConstructorCard 
                                        key={item.id} 
                                        moveCard={moveRow} 
                                        item={item} 
                                        handleClose={()=>deleteIngredient(item.id)} 
                                        idx={index}
                                    />
                                )
                            })
                        }
                    </div>
                    {bunConstructor('bottom')}
                </div>
                <div className={cn(styles.total, 'mr-4')}>
                    <span className={cn(styles.price, 'text text_type_digits-default')}>{totalPrice}</span>
                    <CurrencyIcon type="primary" />
                    {(BurgerConstructorBun.length === 0 || BurgerConstructorBody.length === 0) ? 
                    (
                        <Button text={'оформить заказ'} className={cn(styles.button_disabled, 'ml-10', 'text text_type_main-default')}/>
                    ) : (
                        <Button text={'оформить заказ'} className={cn(styles.button, 'ml-10', 'text text_type_main-default')} onClick={handleOpen}/>
                        )
                    }
                    
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
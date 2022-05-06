import React, {useCallback } from "react";
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
    DND_UPDATE_CONSTRUCTOR_BODY
} from '../../services/actions/actions';

interface RootState {
    burgerConstructorReducer: any,
    totalPriceReducer: any
}


const BurgerConstructor: React.FC = () => {
    const dispatch = useDispatch();
    const id = uuidv4();
    const {BurgerConstructorBun} = useSelector((store: RootState) => store.burgerConstructorReducer);
    const {BurgerConstructorBody} = useSelector((store: RootState) => store.burgerConstructorReducer);
    const {totalPrice} = useSelector((store: RootState) => store.totalPriceReducer);

    const [isOpen, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true)
        const arrMenu = BurgerConstructorBun.concat(BurgerConstructorBody);
        const data = { "ingredients": arrMenu.map((item: any) => {
                return item._id
            })
        }
        dispatch(fetchOrderDetails(data as any))
    }

    const handleClose = () => {
        setOpen(false)
    }

    const deleteIngredient = (id: string) => {
        BurgerConstructorBody.map((item: any, index: number) => {
            if(item.id === id) {
                dispatch({type: DELETE_CONSTRUCTOR_BODY, index})
                dispatch({type: DECREMENT_BODY, item})
            }
        })
    }

    const [, dropTarget] = useDrop({
        accept: 'ingridient',
        drop(data: any) {
            data.id = id;
            data.count = 0;
            if(data.type === 'bun') {
                data.count++;
                dispatch({type: UPDATE_CONSTRUCTOR_BUN, data});
                if(BurgerConstructorBun.length === 0) {
                    dispatch({type: INCREMENT_BUN, data})
                }else {
                    BurgerConstructorBun.map((element: any) => {
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

    const moveCard = (dragIdex: any, hoverIndex: any) => {
        const dragCard = BurgerConstructorBody[dragIdex];
        const newCards = BurgerConstructorBody;
        newCards.splice(dragIdex, 1);
        newCards.splice(hoverIndex, 0, dragCard);
        dispatch({type: DND_UPDATE_CONSTRUCTOR_BODY, newCards})
        
    }
    const moveRow = useCallback(debounce(moveCard, 300), [BurgerConstructorBody]);

    const bunConstructor = (type: any) => {
        if(BurgerConstructorBun.length === 0) {
            return (
                <div className={cn(styles.wrap, type === 'top' ? styles.wrap_top : styles.wrap_button)}>
                    { type === 'top' ? <p>булка верх</p> : <p>булка низ</p>}
                </div>
            )
        }
        else {
            return BurgerConstructorBun.map((item: any) => {
                return(
                    <div className={cn(styles.wrap)}  key={uuidv4()}>
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
                            BurgerConstructorBody.map((item: any, index: number) => {
                                return(
                                    <ConstructorCard 
                                        key={uuidv4()} 
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
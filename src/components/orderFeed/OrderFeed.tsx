import React, { useState, useEffect } from "react";
import styles from './OrderFeed.module.css';
import cn from "classnames";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/Modal";
import { FeedPage } from "../feedPage/FeedPage";
import { useDispatch, useSelector } from "react-redux";
import { changeDate, rangeDate, showInfoOrder } from "../../utils/utils";
import { DELETE_INGREDIENT_DETAILS, fetchIngridients, INGREDIENT_DETAILS } from "../../services/actions/actions";
import { Link, useHistory, useLocation } from "react-router-dom";

interface RootState {
    FeedReducer: any;
    burgerReducer: any
}

export const OrderFeed = (props: any) => {
    const { profile } = props;
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const [isOpen, setOpen] = useState(false);

    const {feedList} = useSelector((store: RootState) => store.FeedReducer);
    const {BurgerIngredients} = useSelector((store: RootState) => store.burgerReducer);

    useEffect(() => {
        dispatch(fetchIngridients())
     }, []);
    
    useEffect(() => {
        if(localStorage.getItem('feed')) {
            const item = JSON.parse(localStorage.getItem('feed') as string)
            handleFeedId(item)
        }
    }, [])

    const handleFeedId = (item: any) => {
        setOpen(true)
        dispatch({type: INGREDIENT_DETAILS, IngredientDetails: item})
        localStorage.setItem('feed', JSON.stringify(item));
    }

    const handleClose = () => {
        setOpen(false)
        history.push('/feed')
        dispatch({type: DELETE_INGREDIENT_DETAILS, IngredientDetails: []})
        delete localStorage.feed;
    }

    return (
        <div className={cn(styles.tape)}>
            {feedList.length !== 0 &&
                feedList.orders?.map((item: any) => {
                    return (
                        <Link key={item._id}
                            to={{pathname: `/feed/${item._id}`, state: { background: location }}} 
                            className={styles.link}
                        >
                            <div className={cn(styles.wrap, 'p-6', 'mb-4', 'mr-2')} onClick={() => handleFeedId(item)} key={item._id}>
                            <div className={cn(styles.inner, 'mb-6')}>
                                <span className={cn(styles.number, "text text_type_digits-default")}>#{item.number}</span>
                                <span className={cn(styles.date, "text text_type_main-default text_color_inactive")}>{changeDate(item.createdAt)} i-GMT+3</span>
                            </div>
                            <p className={cn(styles.text, "text text_type_main-medium", 'mb-2')}>{item.name}</p>
                            {profile && <p className={cn(styles.status, "text text_type_main-default", 'mb-6')}>{item.status}</p>}
                            <div className={styles.blockIcons}>
                                
                                <div className={cn(styles.icon, 'mr-6')}>
                                    {showInfoOrder(item.ingredients, BurgerIngredients, 'icon').map((item: any) => {
                                        return (
                                            <img className={cn(styles.img)} src={item} alt=''  />
                                        )
                                        })
                                    }
                                </div>
                                <div className={styles.price}>
                                    <span 
                                        className={cn(styles.total, "text text_type_digits-medium", 'mr-2')}
                                    >
                                        {showInfoOrder(item.ingredients, BurgerIngredients, 'price').reduce((item: any, current: any) => {return item + current})}
                                    </span>
                                    <CurrencyIcon type="primary" />
                                </div>
                            </div>
                        </div>
                        </Link>   
                    )
                })
            }
            {isOpen && 
                <Modal onClose={handleClose} text={'#034533'} feedPage>
                    <FeedPage/>
                </Modal>
            }
        </div>
    )
}
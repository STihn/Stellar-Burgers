import React, { useState, useEffect } from "react";
import styles from './OrderFeed.module.css';
import cn from "classnames";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/Modal";
import { FeedPage } from "../feedPage/FeedPage";
import { IFeedList, IFetchIngridient, IOrderObj, useDispatch, useSelector } from "../../utils/types";
import { changeDate, getCookie, showInfoOrder } from "../../utils/utils";
import { DELETE_INGREDIENT_DETAILS, FETCH_INGRIDIENTS, INGREDIENT_DETAILS } from "../../services/actions/actions";
import { Link, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { wsFeedActions, WS_MESSAGE } from "../../services/actions/actionsFeed";
import { WS_BASE_URL } from "../../services/WebSocket";
import { isEmpty } from "lodash";

interface IProps {
    profile?: boolean
}

export const OrderFeed: React.FC<IProps> = (props) => {
    const { profile } = props;
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const [isOpen, setOpen] = useState(false);

    const {feedList} = useSelector((store) => store.FeedReducer);
    const {BurgerIngredients} = useSelector((store) => store.burgerReducer);
    const {IngredientDetails} = useSelector((store) => store.burgerReducer);
    const {number} = IngredientDetails as IOrderObj;
    const token = getCookie('accessToken')?.slice(7, getCookie('accessToken')?.length);

    useEffect(() => {
        if(profile) {
            dispatch({type: wsFeedActions.wsConnect, action: `${WS_BASE_URL}/orders?token=${token}`});
        }
        if(localStorage.getItem('feed')) {
            const item = JSON.parse(localStorage.getItem('feed') as string)
            const feedList = JSON.parse(localStorage.getItem('feedList') as string)
            const BurgerIngredients = JSON.parse(localStorage.getItem('BurgerIngredients') as string)
            dispatch({ type: WS_MESSAGE, payload: feedList });
            dispatch({type: FETCH_INGRIDIENTS, BurgerIngredients: BurgerIngredients})
            handleFeedOpen(item)
        }

        return () => {
            if(profile) {
                dispatch({type: wsFeedActions.wsDisconnect, action: `${WS_BASE_URL}/orders?token=${token}`})
            }
        }
    }, [])

    const handleFeedOpen = (item: IOrderObj) => {
        setOpen(true)
        dispatch({type: INGREDIENT_DETAILS, IngredientDetails: item})
        
        localStorage.setItem('feed', JSON.stringify(item));
        localStorage.setItem('feedList', JSON.stringify(feedList));
        localStorage.setItem('BurgerIngredients', JSON.stringify(BurgerIngredients));
    }

    const handleClose = () => {
        setOpen(false)
        if(profile) {
            history.push('/profile/orders')
        }else {
            history.push('/feed')
        }
        dispatch({type: DELETE_INGREDIENT_DETAILS, IngredientDetails: []})
        delete localStorage.feed;
    }

    return (
        <div className={cn(styles.tape)}>
            {feedList &&
                feedList.orders?.map((item) => {
                    return (
                        <Link key={item._id}
                            to={{pathname: `/${profile ? 'profile/orders': 'feed'}/${item._id}`, state: { background: location }}} 
                            className={styles.link}
                        >
                            <div className={cn(styles.wrap, 'p-6', 'mb-4', 'mr-2')} onClick={() => handleFeedOpen(item)} key={item._id}>
                            <div className={cn(styles.inner, 'mb-6')}>
                                <span className={cn(styles.number, "text text_type_digits-default")}>#{item.number}</span>
                                <span className={cn(styles.date, "text text_type_main-default text_color_inactive")}>{changeDate(item.createdAt)} i-GMT+3</span>
                            </div>
                            <p className={cn(styles.text, "text text_type_main-medium", 'mb-2')}>{item.name}</p>
                            {profile && <p className={cn(styles.status, "text text_type_main-default", 'mb-6')}>{item.status}</p>}
                            <div className={styles.blockIcons}>
                                
                                <div className={cn(styles.icon, 'mr-6')}>
                                    {showInfoOrder(item.ingredients, BurgerIngredients, 'icon').map((item, index: number) => {
                                        const idx = uuidv4();
                                        const {image, len} = item as {image: string, len: number}
                                        if(index < 5) {
                                            return (
                                                <img className={cn(styles.img)} src={image} alt=''  key={idx}/>
                                            )
                                        } else if(index === 5) {
                                            return (
                                                <div className={cn(styles.imageWrap)} key={idx}>
                                                    <img className={cn(styles.image)} src={image} alt='' />
                                                    <span className={cn(styles.count, 'text text_type_digits-default')}>
                                                        {`+${len - 5}`}
                                                    </span>
                                                </div>
                                            )
                                        }

                                        })
                                    }
                                </div>
                                <div className={styles.price}>
                                    <span 
                                        className={cn(styles.total, "text text_type_digits-medium", 'mr-2')}
                                    >
                                        {!isEmpty(showInfoOrder(item.ingredients, BurgerIngredients, 'price')) && (showInfoOrder(item.ingredients, BurgerIngredients, 'price') as number[]).reduce((item: number, current: number) => {return item + current})}
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
                <Modal onClose={handleClose} text={`#${number}`} feedPage>
                    <FeedPage/>
                </Modal>
            }
        </div>
    )
}
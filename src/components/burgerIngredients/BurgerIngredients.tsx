import React, {useState, useEffect, useRef} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from "react-router-dom";

import cn from 'classnames';
import styles from './burgerIngredients.module.css';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import Ingredient from '../ingridient/Ingredient';
import Modal from '../modal/Modal';
import IngredientDetails from '../ingredientDetails/IngredientDetails';
import { fetchIngridients } from '../../services/actions/actions';
import { INGREDIENT_DETAILS, DELETE_INGREDIENT_DETAILS, TAB_BUN, TAB_SAUSE, TAB_MAIN } from '../../services/actions/actions';
import { Spinner } from "../spinner/spinner";

interface RootState {
    BurgerIngredients: any,
    burgerReducer: any,
    tabSwitchReducer: any,
    burgerConstructorReducer: any,
    spinnerReducer: any
}

export interface IItem {
    calories: number,
    carbohydrates: number,
    fat: number,
    image: string,
    image_large: string,
    image_mobile: string,
    name: string,
    price: number,
    proteins: number,
    type: string,
    __v: number,
    _id: string
}

const BurgerIngredients = () => {
    const dispatch = useDispatch();
    const {BurgerIngredients} = useSelector((store: RootState) => store.burgerReducer);
    const {currentTab} = useSelector((store: RootState) => store.tabSwitchReducer);
    const {BurgerConstructorBun} = useSelector((store: RootState) => store.burgerConstructorReducer);
    const {BurgerConstructorBody} = useSelector((store: RootState) => store.burgerConstructorReducer);
    const {spinner} = useSelector((store: RootState) => store.spinnerReducer);

    const location = useLocation();
    const history = useHistory();

    const [isOpen, setOpen] = useState(false);

    const bunRef = useRef<HTMLParagraphElement| null>(null);
    const sauseRef = useRef<HTMLParagraphElement| null>(null);
    const mainRef = useRef<HTMLParagraphElement| null>(null);
    const scrollRef = useRef<HTMLDivElement| null>(null);
    
    useEffect(() => {
       dispatch(fetchIngridients())
    }, []);
    
    useEffect(() => {
        if(localStorage.getItem('modal')) {
            const item: IItem = JSON.parse(localStorage.getItem('modal') as string)
            handleOpen(item)
        }
    }, [])
    
    const handleOpen = (item: Record<string, any>) => {
        setOpen(true)
        dispatch({type: INGREDIENT_DETAILS, IngredientDetails: item})
        localStorage.setItem('modal', JSON.stringify(item));
    }

    const handleClose = () => {
        setOpen(false)
        history.push('/')
        dispatch({type: DELETE_INGREDIENT_DETAILS, IngredientDetails: []})
        delete localStorage.modal;
    }

    const setCurrent = (value: string) => {
        dispatch({type: `TAB_${value}`, currentTab: value});
    }

    const handleScroll = () => {
        const scrollTop: number = (scrollRef.current as HTMLDivElement).scrollTop;

        if(scrollTop ===  0) {
            dispatch({type: TAB_BUN, currentTab: 'BUN'});
        }
        else if (scrollTop >= 250 && scrollTop <= 819) {
            dispatch({type: TAB_SAUSE, currentTab: 'SAUSE'});
        }
        else if (scrollTop >= 820) {
            dispatch({type: TAB_MAIN, currentTab: 'MAIN'});
        }
    };

    const bunScroll = () => (bunRef.current as HTMLParagraphElement).scrollIntoView();
    const sauseScroll = () => (sauseRef.current as HTMLParagraphElement).scrollIntoView();
    const mainScroll = () => (mainRef.current as HTMLParagraphElement).scrollIntoView();

    return (
        <section className={cn(styles.body, 'mb-10')}>
            <h1 className={cn(styles.header, 'mt-10', 'mb-5', 'text text_type_main-large')}>Соберите бургер</h1>
            <div className={cn(styles.wrap, 'mb-10')}>
                <Tab value="BUN" active={currentTab === 'BUN'} onClick={setCurrent}>
                    <p className={cn(styles.tab_text, 'text text_type_main-default', currentTab === 'BUN' && 'tab_text-active')} onClick={bunScroll}>Булки</p>
                </Tab>
                <Tab value="SAUSE" active={currentTab === 'SAUSE'} onClick={setCurrent} >
                    <p className={cn(styles.tab_text, 'text text_type_main-default', currentTab === 'SAUSE' && 'tab_text-active')} onClick={sauseScroll}>Соусы</p>
                </Tab>
                <Tab value="MAIN" active={currentTab === 'MAIN'} onClick={setCurrent}>
                    <p className={cn(styles.tab_text, 'text text_type_main-default', currentTab === 'MAIN' && 'tab_text-active')} onClick={mainScroll}>Начинки</p>
                </Tab>
            </div>
            {spinner ? <Spinner/> : 
            (<div className={styles.inner} ref={scrollRef} onScroll={handleScroll}>
                <p ref={bunRef} className={cn(styles.subtitle, 'text text_type_main-small', 'mb-6')}>Булки</p>
                <div className={cn(styles.block)}>
                    {BurgerIngredients.map((item:  Record<string, any>) => {
                        return item.type === 'bun' && 
                            <Link
                                key={item._id}
                                to={{pathname: `/ingredients/${item._id}`, state: { background: location }}} 
                                className={styles.link}
                            >
                                <Ingredient 
                                    data={item} 
                                    key={item._id}
                                    onClick={()=>handleOpen(item)} 
                                    counter={BurgerConstructorBun}
                                />
                            </Link>
                    })}
                </div>
                <p ref={sauseRef} className={cn(styles.subtitle, 'text text_type_main-small', 'mb-6')}>Соусы</p>
                <div className={cn(styles.block)}>
                    {BurgerIngredients.map((item:  Record<string, any>) => {
                        return item.type === 'sauce' &&  
                            <Link
                                key={item._id}
                                to={{pathname: `/ingredients/${item._id}`, state: { background: location }}} 
                                className={styles.link}
                            >
                                <Ingredient
                                    data={item} 
                                    key={item._id} 
                                    onClick={()=>handleOpen(item)} 
                                    counter={BurgerConstructorBody}
                                />
                            </Link>
                    })}
                </div>
                <p ref={mainRef} className={cn(styles.subtitle, 'text text_type_main-small', 'mb-6')}>Начинки</p>
                <div className={cn(styles.block)}>
                    {BurgerIngredients.map((item:  Record<string, any>) => {
                        return item.type === 'main' &&  
                            <Link
                                key={item._id}
                                to={{pathname: `/ingredients/${item._id}`, state: { background: location }}} 
                                className={styles.link}
                            >
                                <Ingredient 
                                    data={item} 
                                    key={item._id}
                                    onClick={()=>handleOpen(item)} 
                                    counter={BurgerConstructorBody}
                                />
                            </Link>
                    })}
                </div>
            </div>)
            }
            {isOpen && 
                <Modal onClose={handleClose} text={'Детали ингредиента'}>
                    <IngredientDetails/>
                </Modal>
            }
        </section>
    )
}

export default BurgerIngredients;

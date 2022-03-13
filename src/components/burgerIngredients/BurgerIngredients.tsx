import React, {useState, useEffect, useRef} from "react";
import { useSelector, useDispatch } from 'react-redux';

import cn from 'classnames';
import styles from './burgerIngredients.module.css';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import Ingredient from '../ingridient/Ingredient';
import Modal from '../modal/Modal';
import IngredientDetails from '../ingredientDetails/IngredientDetails';
import { fetchIngridients } from '../../services/reducers/reducers';
import { INGREDIENT_DETAILS, DELETE_INGREDIENT_DETAILS, TAB_BUN, TAB_SAUSE, TAB_MAIN } from '../../services/actions/actions';

interface RootState {
    BurgerIngredients: any,
    burgerReducer: any,
    tabSwitchReducer: any
}

const BurgerIngredients = () => {
    const dispatch = useDispatch();
    const {BurgerIngredients} = useSelector((store: RootState) => store.burgerReducer);
    const {currentTab} = useSelector((store: RootState) => store.tabSwitchReducer);

    const [isOpen, setOpen] = useState(false);

    const bunRef = useRef<any>(null);
    const sauseRef = useRef<any>(null);
    const mainRef = useRef<any>(null);
    const scrollRef = useRef<any>(null);
    
    useEffect(() => {
        dispatch(fetchIngridients())
    }, []);


    const handleOpen = (item: Record<string, any>) => {
        setOpen(true)
        dispatch({type: INGREDIENT_DETAILS, IngredientDetails: item})
    }

    const handleClose = () => {
        setOpen(false)
        dispatch({type: DELETE_INGREDIENT_DETAILS, IngredientDetails: []})
    }

    const setCurrent = (value: string) => {
        dispatch({type: `TAB_${value}`, currentTab: value});
    }

    const handleScroll = () => {
        const scrollTop = scrollRef.current.scrollTop;
        // const scrollSause = sauseRef.current.scrollTop;
        // const scrollMain = mainRef.current.scrollTop;

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

    const bunScroll = () => bunRef.current.scrollIntoView();
    const sauseScroll = () => sauseRef.current.scrollIntoView();
    const mainScroll = () => mainRef.current.scrollIntoView();
    
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
            <div className={styles.inner} ref={scrollRef} onScroll={handleScroll}>
                <p ref={bunRef} className={cn(styles.subtitle, 'text text_type_main-small', 'mb-6')}>Булки</p>
                <div className={cn(styles.block)}>
                    {BurgerIngredients.map((item:  Record<string, any>) => {
                        return item.type === 'bun' &&  <Ingredient data={item} key={item._id} onClick={()=>handleOpen(item)}/>
                    })}
                </div>
                <p ref={sauseRef} className={cn(styles.subtitle, 'text text_type_main-small', 'mb-6')}>Соусы</p>
                <div className={cn(styles.block)}>
                    {BurgerIngredients.map((item:  Record<string, any>) => {
                        return item.type === 'sauce' &&  <Ingredient data={item} key={item._id} onClick={()=>handleOpen(item)}/>
                    })}
                </div>
                <p ref={mainRef} className={cn(styles.subtitle, 'text text_type_main-small', 'mb-6')}>Начинки</p>
                <div className={cn(styles.block)}>
                    {BurgerIngredients.map((item:  Record<string, any>) => {
                        return item.type === 'main' &&  <Ingredient data={item} key={item._id} onClick={()=>handleOpen(item)}/>
                    })}
                </div>
            </div>
            {isOpen && 
                <Modal onClose={handleClose} text={'Детали ингредиента'}>
                    <IngredientDetails/>
                </Modal>
            }
        </section>
    )
}

export default BurgerIngredients;
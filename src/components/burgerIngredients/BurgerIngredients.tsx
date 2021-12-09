import React from "react";
import cn from 'classnames';

import styles from './burgerIngredients.module.css';

import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';

import Ingredient from '../ingridient/Ingredient';
import Modal from "../modal/Modal";
import IngredientDetails from "../ingredientDetails/IngredientDetails";



const BurgerIngredients = () => {
    const [current, setCurrent] = React.useState('one');
    const [state, setState] = React.useState({data: []})
    const [ingredient, setIngredient] = React.useState({})

    React.useEffect(() => {
        try{
            const data = async() => {
                const res = await fetch('https://norma.nomoreparties.space/api/ingredients');
                const result = await res.json();
                setState({data: result.data})
            }
            data()
        }
        catch(err) {
            console.log(err)
        }

        
    }, [])
    const [isOpen, setOpen] = React.useState(false);

    const handleOpen = (item: Record<string, any>) => {
        setOpen(true)
        setIngredient(item) 
    }

    const handleClose = () => {
        setOpen(false)
    }
    
    return (
        <section className={cn(styles.body, 'mb-10')}>
            <h1 className={cn(styles.header, 'mt-10', 'mb-5', 'text text_type_main-large')}>Соберите бургер</h1>
            <div className={cn(styles.wrap, 'mb-10')}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent} >
                    <p className={cn(styles.tab_text, 'text text_type_main-default')}>Булки</p>
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent} >
                    <p className={cn(styles.tab_text, 'text text_type_main-default')}>Соусы</p>
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent} >
                    <p className={cn(styles.tab_text, 'text text_type_main-default')}>Начинки</p>
                </Tab>
            </div>
            <div className={styles.inner}>
                <p className={cn(styles.subtitle, 'text text_type_main-small', 'mb-6')}>Булки</p>
                <div className={cn(styles.block)}>
                    {state.data.map((item:  Record<string, any>) => {
                        return item.type === 'bun' &&  <Ingredient data={item} key={item._id} onClick={()=>handleOpen(item)}/>
                    })}
                </div>
                <p className={cn(styles.subtitle, 'text text_type_main-small', 'mb-6')}>Соусы</p>
                <div className={cn(styles.block)}>
                    {state.data.map((item:  Record<string, any>) => {
                        return item.type === 'sauce' &&  <Ingredient data={item} key={item._id} onClick={()=>handleOpen(item)}/>
                    })}
                </div>
                <p className={cn(styles.subtitle, 'text text_type_main-small', 'mb-6')}>Начинки</p>
                <div className={cn(styles.block)}>
                    {state.data.map((item:  Record<string, any>) => {
                        return item.type === 'main' &&  <Ingredient data={item} key={item._id} onClick={()=>handleOpen(item)}/>
                    })}
                </div>
            </div>
            {isOpen && 
                <Modal onClose={handleClose} text={'Детали ингредиента'}>
                    <IngredientDetails data={ingredient}/>
                </Modal>
            }
        </section>
    )
}

export default BurgerIngredients;
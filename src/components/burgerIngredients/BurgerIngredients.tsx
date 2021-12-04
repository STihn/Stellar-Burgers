import React from "react";
import cn from 'classnames';

import Ingredients from  '../ingridients/Ingredients';

import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burgerIngredients.module.css';
import ModalOverlay from "../modalOverlay/ModalOverlay";
import Modal from "../modal/Modal";
import IngredientDetails from "../ingredientDetails/IngredientDetails";



const BurgerIngredients = () => {
    const [current, setCurrent] = React.useState('one');
    const [state, setState] = React.useState({
        data: [] as any
    })
    const [ingredient, setIngredient] = React.useState()

    React.useEffect(() => {
        const data = async() => {
            const res = await fetch('https://norma.nomoreparties.space/api/ingredients');
            const result = await res.json();
            setState({data: result.data})
        }
        data()
        
    }, [])
    const [isOpen, setOpen] = React.useState(false);

    const handleOpen = (item: any) => {
        setOpen(true)
        setIngredient(item)
    }

    const handleClouse = () => {
        setOpen(false)
    }

    React.useEffect(() => {
        const handleEsc = (event: { keyCode: number; }) => {
           if (event.keyCode === 27) {
            setOpen(false)
          }
        };
        window.addEventListener('keydown', handleEsc);
    
        return () => {
          window.removeEventListener('keydown', handleEsc);
        };
      }, []);
    
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
                    {state.data.map((item: any) => {
                        return item.type === 'bun' &&  <Ingredients data={item} key={item._id} onClick={()=>handleOpen(item)}/>
                    })}
                </div>
                <p className={cn(styles.subtitle, 'text text_type_main-small', 'mb-6')}>Соусы</p>
                <div className={cn(styles.block)}>
                    {state.data.map((item: any) => {
                        return item.type === 'sauce' &&  <Ingredients data={item} key={item._id} onClick={()=>handleOpen(item)}/>
                    })}
                </div>
                <p className={cn(styles.subtitle, 'text text_type_main-small', 'mb-6')}>Начинки</p>
                <div className={cn(styles.block)}>
                    {state.data.map((item: any) => {
                        return item.type === 'main' &&  <Ingredients data={item} key={item._id} onClick={()=>handleOpen(item)}/>
                    })}
                </div>
            </div>
            <div style={{overflow: 'hidden'}} id="react-modals">
                {isOpen && 
                    <React.Fragment>
                        <ModalOverlay onClouse={handleClouse} />
                        <Modal onClouse={handleClouse} text={'Детали ингредиента'}>
                            <IngredientDetails data={ingredient}/>
                        </Modal>
                    </React.Fragment>

                }
            </div>
        </section>
    )
}

export default BurgerIngredients;
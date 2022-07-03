import React from "react";
import styles from './MainPage.module.css';

import BurgerIngredients from '../../components/burgerIngredients/BurgerIngredients';
import BurgerConstructor from '../../components/burgerConstructor/BurgerConstructor';

const MainPage: React.FC = () => {

    return (
        <main className={styles.main}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
    )
    
} 

export default MainPage;
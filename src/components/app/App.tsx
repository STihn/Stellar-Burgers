import React from 'react';
import styles from'./app.module.css';
import AppHeader from '../app-header/AppHeader';
import BurgerIngredients from '../burgerIngredients/BurgerIngredients';
import BurgerConstructor from '../burgerConstructor/BurgerConstructor';

function App() {
  return (
    <div className={styles.root}>
          <AppHeader/>
          <main className={styles.main}>
            <BurgerIngredients />
            <BurgerConstructor />
          </main>
    </div>

  );
}

export default App;

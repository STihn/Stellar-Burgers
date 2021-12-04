import React from 'react';
import styles from'./App.module.css';
import AppHeader from './components/app-header/AppHeader';
import BurgerIngredients from './components/burgerIngredients/BurgerIngredients';
import BurgerConstructor from './components/burgerConstructor/BurgerConstructor';
import Modal from './components/modal/Modal';

function App() {
  return (
    <div className={styles.root}>
          <AppHeader/>
          <main className={styles.main}>
            <BurgerIngredients />
            <BurgerConstructor />
          </main>
        {/* <Modal/> */}
    </div>

  );
}

export default App;

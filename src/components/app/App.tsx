import React from 'react';
import ReactDOM from 'react-dom';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import styles from'./app.module.css';

import AppHeader from '../app-header/AppHeader';
import BurgerIngredients from '../burgerIngredients/BurgerIngredients';
import BurgerConstructor from '../burgerConstructor/BurgerConstructor';

const App = () => {

  return (
    <div className={styles.root}>
      <AppHeader/>
      <DndProvider backend={HTML5Backend}>
        <main className={styles.main}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      </DndProvider>
    </div>

  );
}

export default App;

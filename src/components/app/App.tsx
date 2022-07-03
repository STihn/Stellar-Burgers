import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import styles from'./app.module.css';

import AppHeader from '../app-header/AppHeader';
import MainPage from '../../pages/MainPage/MainPage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';
import ForgotPassword from '../../pages/Forgot-password/Forgot-password';
import ResetPassword from '../../pages/Reset-password/Reset-password';
import Profile from '../../pages/Profile/Profile';

const App = () => {

  return (
    <div className={styles.root}>

      <DndProvider backend={HTML5Backend}>
        <AppHeader/>
          <Switch>
            <Route path='/login' exact>
              <Login/>
            </Route>
            <Route path='/register' exact>
              <Register/>
            </Route>
            <Route path='/forgot-password' exact>
                <ForgotPassword/>
            </Route>
            <Route path='/reset-password' exact>
                <ResetPassword/>
            </Route>
            <Route path='/ingredients/:id' exact>
            </Route>
            <Route path='/profile' exact>
                <Profile/>
            </Route>
            <Route path='/' exact>
                <MainPage/>
            </Route>
            <Route>
            <NotFoundPage/>
            </Route>
          </Switch>
      </DndProvider>
    </div>
  );
}

export default App;

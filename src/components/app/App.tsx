import React, { FC, useEffect } from 'react';
import { Route, Switch, useLocation } from "react-router-dom";
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
import ProtectedRoute from '../protectedRoute/protected-route';
import ProtectedRouteAuth from '../protectedRouteAuth/protected-route-auth';
import IngredientPage from '../ingredientPage/ingredientPage';
import { FeedPages } from '../../pages/FeedPages/FeedPages';
import { FeedPage } from '../feedPage/FeedPage';
import { OrderFeed } from '../orderFeed/OrderFeed';
import { DefineOrder } from '../../pages/DefineOrder/DefineOrder';
import { fetchIngridients } from '../../services/actions/actions';
import { useDispatch } from "../../utils/types";
import { ProfileOrders } from '../../pages/ProfileOrders/ProfileOrders';
import { ProfileOrder } from '../../pages/ProfileOrder/ProfileOrder';
import { OneFeedPage } from '../../pages/OneFeedPage/OneFeedPage';

interface IState extends ILocation {
  background: ILocation
}
export interface ILocation {
  hash: string,
  key: string,
  pathname: string,
  search: string,
  state: IState
}

const App: FC = () => {
  const dispatch = useDispatch()
  const location = useLocation<IState>();
  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(fetchIngridients())
 }, []);

  return (
    <div className={styles.root}>

      <DndProvider backend={HTML5Backend}>
        <AppHeader/>
          <Switch location={background || location}>
            <ProtectedRouteAuth path='/login' exact>
              <Login/>
            </ProtectedRouteAuth>
            <ProtectedRouteAuth path='/register' exact>
              <Register/> 
            </ProtectedRouteAuth>
            <ProtectedRouteAuth path='/forgot-password' exact>
              <ForgotPassword/>
            </ProtectedRouteAuth>
            <ProtectedRouteAuth path='/reset-password' exact>
              <ResetPassword/>
            </ProtectedRouteAuth>
            <Route path='/ingredients/:id' exact>
              <IngredientPage/>
            </Route>
            <ProtectedRoute path='/profile' exact>
              <Profile/>
            </ProtectedRoute>
            <Route path='/feed' exact>
              <FeedPages/>
            </Route>
            <Route path='/feed/:id' exact>
              <OneFeedPage/>
            </Route>
            <Route path='/profile/orders' exact>
              <ProfileOrders/>
            </Route>
            <Route path='/profile/orders/:id' exact>
              <ProfileOrder/>
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

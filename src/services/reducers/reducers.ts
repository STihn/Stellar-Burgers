import { combineReducers } from "redux";
import {
    FETCH_INGRIDIENTS,
    INGREDIENT_DETAILS,
    DELETE_INGREDIENT_DETAILS,
    TAB_BUN,
    TAB_MAIN,
    TAB_SAUSE,
    UPDATE_CONSTRUCTOR
    } from '../actions/actions';

const initialState = {
    BurgerIngredients: [],
    BurgerConstructor: [],
    IngredientDetails: [],
    OrderDetails: [],
    currentTab: 'BUN'
}

export function fetchIngridients() {
    return async (dispatch: Function) => {
        try{
            const res = await fetch('https://norma.nomoreparties.space/api/ingredients');
            const result = await res.json();
            await dispatch({type: FETCH_INGRIDIENTS, BurgerIngredients: result.data})
        }
        catch(err) {
            console.log(err)
        }
    } 

}

const tabSwitchReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case TAB_BUN: {
            return {
                ...state,
                currentTab: 'BUN'
            }
        }
        case TAB_SAUSE: {
            return {
                ...state,
                currentTab: 'SAUSE'
            }
        }
        case TAB_MAIN: {
            return {
                ...state,
                currentTab: 'MAIN'
            }
        }
        default: {
            return state
        }
    }
}


const burgerReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case FETCH_INGRIDIENTS: {
            return {
                ...state,
                BurgerIngredients: action.BurgerIngredients
            }
        }
        case INGREDIENT_DETAILS: {
            return {
                ...state,
                IngredientDetails: action.IngredientDetails
            }
        }
        case DELETE_INGREDIENT_DETAILS: {
            console.log(action)
            return {
                ...state,
                IngredientDetails: []
            }
        }
      default: {
          return state
      }
    }
}

const burgerConstructorReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case UPDATE_CONSTRUCTOR: {
            // console.log(action, '33')
            return {
                ...state,
                BurgerConstructor: [...state.BurgerConstructor,action.data]
            }
        }
      default: {
          return state
      }
    }
}

export const rootReducer = combineReducers({
    burgerReducer,
    tabSwitchReducer,
    burgerConstructorReducer
})
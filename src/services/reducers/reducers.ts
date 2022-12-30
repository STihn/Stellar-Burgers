import { combineReducers } from "redux";
import { userReducuer } from "./reducerUser";
import {
    FETCH_INGRIDIENTS,
    INGREDIENT_DETAILS,
    DELETE_INGREDIENT_DETAILS,
    TAB_BUN,
    TAB_MAIN,
    TAB_SAUSE,
    UPDATE_CONSTRUCTOR_BUN,
    UPDATE_CONSTRUCTOR_BODY,
    INCREMENT_BUN,
    INCREMENT_BODY,
    DECREMENT_BUN,
    DECREMENT_BODY,
    DELETE_CONSTRUCTOR_BODY,
    ORDER_DETAILS,
    DND_UPDATE_CONSTRUCTOR_BODY,
    CLEAR_CONSTRUCTOR,
    CLEAR_ORDER_DETAILS,
    CLEAR_TOTAL_PRICE,
    SPINNER
    } from '../actions/actions';
import { FeedReducer } from "./reducersFeed";
import { 
    IConstructorItems,
    IIngredients, 
    IInitialState, 
    ISpinner, 
    TBurgerConstructorActions, 
    TBurgersActions, 
    TOrderDetailsActions, 
    TTabSwitchActions, 
    TTotalPriceActions 
    } from "../../utils/types";

export const initialState: IInitialState = {
    BurgerIngredients: [],
    BurgerConstructorBun: [],
    BurgerConstructorBody: [],
    IngredientDetails: [],
    OrderDetails: [],
    currentTab: 'BUN',
    totalPrice: 0,
    auth: null,
    spinner: false,
    wsStatus: 'OFFLINE',
    wsError: '',
    feedList: null
}

export const tabSwitchReducer = (state: IInitialState = initialState, action: TTabSwitchActions): IInitialState => {
    switch (action.type) {
        case TAB_BUN: {
            return {
                ...state,
                currentTab: action.currentTab
            }
        }
        case TAB_SAUSE: {
            return {
                ...state,
                currentTab: action.currentTab
            }
        }
        case TAB_MAIN: {
            return {
                ...state,
                currentTab: action.currentTab
            }
        }
        default: {
            return state
        }
    }
}


export const burgerReducer = (state: IInitialState = initialState, action: TBurgersActions): IInitialState => {
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
            return {
                ...state,
                IngredientDetails: action.IngredientDetails
            }
        }
      default: {
          return state
      }
    }
}

export const deleteBody = (arr: Array<IIngredients>, idx: number) => {
    if(arr.length === 1 ) {
       return arr.slice(0, 0)
    }
    if(idx === 0) {
        return arr.slice(1)
    }
    else {
       return [...arr.slice(0, idx), ...arr.slice(idx + 1)]
    }
}

export const burgerConstructorReducer = (state: IInitialState = initialState, action: TBurgerConstructorActions): IInitialState => {
    switch (action.type) {
        case UPDATE_CONSTRUCTOR_BUN: {
            return {
                ...state,
                BurgerConstructorBun: [action.data]
            }
        }
        case UPDATE_CONSTRUCTOR_BODY: {
            return {
                ...state,
                BurgerConstructorBody: [...state.BurgerConstructorBody, action.data],
            }
        }
        case DELETE_CONSTRUCTOR_BODY: {
            return {
                ...state,
                BurgerConstructorBody: deleteBody(state.BurgerConstructorBody, action.index)
            }
        }
        case DND_UPDATE_CONSTRUCTOR_BODY:  {
            return {
                ...state,
                BurgerConstructorBody: action.newCards
            }
        }
        case CLEAR_CONSTRUCTOR: {
            return {
                ...state,
                BurgerConstructorBun: [],
                BurgerConstructorBody: []
            }
        }
      default: {
          return state
      }
    }
}

const totalPriceReducer = (state = initialState, action: TTotalPriceActions): IInitialState => {
    switch (action.type) {
      case INCREMENT_BUN:
        return { 
            ...state,
            totalPrice: state.totalPrice + (action.payload*2)
        };
      case INCREMENT_BODY:
        return { 
            ...state,
            totalPrice: state.totalPrice + action.price 
        };
      case DECREMENT_BUN:
        return {
            ...state,
            totalPrice: state.totalPrice - (action.payload*2)
        };
      case DECREMENT_BODY:
        return {
            ...state,
            totalPrice: state.totalPrice - action.price
        };
      case CLEAR_TOTAL_PRICE: {
        return {
            ...state,
            totalPrice: 0
        }
      }
      default: {
          return state
      }
    }
}

export const orderDetailsReducer = (state: IInitialState = initialState, action: TOrderDetailsActions): IInitialState => {
    switch(action.type) {
        case ORDER_DETAILS: {
            return {
                ...state,
                OrderDetails: action.OrderDetails,
            }
        }
        case CLEAR_ORDER_DETAILS: {
            return {
                ...state,
                OrderDetails: []
            }
        }
        default: {
            return state
        }
    }
}

export const spinnerReducer = (state: IInitialState = initialState, action: ISpinner): IInitialState => {
    switch(action.type) {
        case SPINNER: {
            return {
                ...state,
                spinner: action.payload
            }
        }
        default: {
            return state
        }
    }
}

export const rootReducer = combineReducers({
    tabSwitchReducer: tabSwitchReducer,
    burgerReducer: burgerReducer,
    burgerConstructorReducer: burgerConstructorReducer,
    totalPriceReducer: totalPriceReducer,
    orderDetailsReducer: orderDetailsReducer,
    userReducuer: userReducuer,
    spinnerReducer: spinnerReducer,
    FeedReducer: FeedReducer,
});
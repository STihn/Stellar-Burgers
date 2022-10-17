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
    CLEAR_TOTAL_PRICE
    } from '../actions/actions';

export const initialState = {
    BurgerIngredients: [],
    BurgerConstructorBun: [] as any,
    BurgerConstructorBody: [],
    IngredientDetails: [],
    OrderDetails: [] as Array<string>,
    currentTab: 'BUN',
    totalPrice: 0,
    auth: {},
    spinner: false,
    WsStatus: 'OFFLINE',
    WsError: '',
    feeList: []
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

const handlerBody = (arr: any, idx: number) => {
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

const burgerConstructorReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case UPDATE_CONSTRUCTOR_BUN: {
            return {
                ...state,
                BurgerConstructorBun: [state.BurgerConstructorBun].map((element: any) => element.type !== action.type ? action.data : state.BurgerConstructorBun),
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
                BurgerConstructorBody: handlerBody(state.BurgerConstructorBody, action.index)
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

const totalPriceReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case INCREMENT_BUN:
        return { totalPrice: state.totalPrice + (action.data?.price*2)};
      case INCREMENT_BODY:
        return { totalPrice: state.totalPrice + action.price };
      case DECREMENT_BUN:
        return { totalPrice: state.totalPrice - action.BurgerConstructorBun.map((item: any) => item.price*2)};
      case DECREMENT_BODY:
        return { totalPrice: state.totalPrice - action.item.price};
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

const orderDetailsReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case ORDER_DETAILS: {
            return {
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

const spinnerReducer = (state = initialState, action: any) => {
        return {
            spinner: action.action
        }
}

export const rootReducer = combineReducers({
    burgerReducer,
    tabSwitchReducer,
    burgerConstructorReducer,
    totalPriceReducer,
    orderDetailsReducer,
    userReducuer,
    spinnerReducer
})
import { WS_CONNECT, WS_OPEN, WS_CLOSE, WS_ERROR, WS_MESSAGE  } from '../services/actions/actionsFeed';
import { AUTH_USER, DELETE_USER } from "../services/actions/actionsUser";
import { CLEAR_CONSTRUCTOR, 
    CLEAR_ORDER_DETAILS, 
    CLEAR_TOTAL_PRICE, 
    DECREMENT_BODY, 
    DECREMENT_BUN, 
    DELETE_CONSTRUCTOR_BODY, 
    DELETE_INGREDIENT_DETAILS, 
    DND_UPDATE_CONSTRUCTOR_BODY, 
    FETCH_INGRIDIENTS, INCREMENT_BODY, 
    INCREMENT_BUN, 
    INGREDIENT_DETAILS, 
    ORDER_DETAILS, 
    SPINNER, 
    TAB_BUN, 
    TAB_MAIN, 
    TAB_SAUSE, 
    UPDATE_CONSTRUCTOR_BODY, 
    UPDATE_CONSTRUCTOR_BUN } from "../services/actions/actions";
import { store } from "..";
import {useDispatch as useDispatchHook, useSelector as useSelectorHook, TypedUseSelectorHook} from 'react-redux';
import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { rootReducer } from '../services/reducers/reducers';


export interface IData {
    image?: string,
    type?: string, 
    price?: number, 
    name?: string,
    fat?: number;
    proteins?: number;
    carbohydrates?: number;
    calories?: number;
    _id?: string,
    count?: number
}

export interface IIngredients {
    count: number,
    id: string,
    image: string,
    name: string,
    price: number,
    type: string,
    _id: string
}

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch =  typeof store.dispatch;
export const useDispatch = () => useDispatchHook<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorHook

export interface IWsActions {
    wsConnect:  string,
    wsDisconnect:  string,
    wsConnecting:  string,
    onOpen: string,
    onClose:  string,
    onError:  string,
    onMessage: string 
}

export interface LiveTableStore {
    status: string,
    connectionError: string,
    table: Record<string, any>
}

export interface IUseRouteMatch {
    id: string
}

export interface IWsConnectAction {
    readonly type: typeof WS_CONNECT;
}

export interface IWsCloseAction {
    readonly type: typeof WS_CLOSE;
}

export interface IWsOpenAction {
    readonly type: typeof WS_OPEN;
}

export interface IWsErrorAction {
    readonly type: typeof WS_ERROR;
    readonly payload: string;
    readonly wsStatus: string;
}

export interface IFeedList {
    orders: IOrderObj[]
    success: boolean
    total: number
    totalToday: number
}
export interface IWsMessageAction {
    readonly type: typeof WS_MESSAGE;
    readonly wsError: string;
    readonly wsStatus: string;
    readonly payload: IFeedList;
}

export interface IOrderObj {
    createdAt: string,
    ingredients: Array<string>,
    name: string,
    number: number,
    status: string,
    updatedAt: string,
    _id: string
}

export interface IWsError {
    message: string,
    success: boolean
}

export type TFeedActions = 
    | IWsMessageAction
  | IWsErrorAction
  | IWsOpenAction
  | IWsCloseAction
  | IWsConnectAction;

export interface IAuthUser {
    success: boolean,
    user: {
        email: string, 
        name: string
    }
}
export interface IAuthUserAction {
    type: typeof AUTH_USER;
    user: IAuthUser;
}


export interface IDeleteUserAction {
    type: typeof DELETE_USER;
    user: null
}

export type TUserActions = 
    | IAuthUserAction
    | IDeleteUserAction;

export interface IOrderDetailsAction {
    readonly type: typeof ORDER_DETAILS;
    readonly OrderDetails: IOrderDetails[];
}

export interface IOrder {
    number: number
}

export interface IOrderDetails {
    name: string,
    order: IOrder,
    success: boolean
}


export interface IOrderDetailsClearAction {
    readonly type: typeof CLEAR_ORDER_DETAILS;
}

export type TOrderDetailsActions = 
    | IOrderDetailsAction
    | IOrderDetailsClearAction;


export interface ITubBunAction {
    readonly type: typeof TAB_BUN;
    currentTab: string;
}

export interface ITubSauseAction {
    readonly type: typeof TAB_SAUSE;
    currentTab: string;
}

export interface ITubMainAction {
    readonly type: typeof TAB_MAIN;
    currentTab: string;
}

export type TTabSwitchActions = 
    | ITubBunAction
    | ITubSauseAction
    | ITubMainAction;

export interface IFetchIngridientsAction {
    readonly type: typeof FETCH_INGRIDIENTS;
    readonly BurgerIngredients:  IFetchIngridient[];
}

export interface IFetchIngridient extends IData {
    fat: number,
    image_large: string,
    image_mobile: string,
    _v: string
}

export interface IIngridientsDetailsAction {
    type: typeof INGREDIENT_DETAILS;
    IngredientDetails: IFetchIngridient;
}

export interface IDeleteIngridientsDetailsAction {
    readonly type: typeof DELETE_INGREDIENT_DETAILS;
    IngredientDetails: []
}

export type TBurgersActions = 
    | IFetchIngridientsAction
    | IIngridientsDetailsAction
    | IDeleteIngridientsDetailsAction;

export interface IUpdateConstructorBunAction {
    readonly type: typeof UPDATE_CONSTRUCTOR_BUN;
    readonly data: IConstructorItems;
}

export interface IConstructorItems {
        image: string,
        type: string,
        price: number,
        name: string,
        _id: string,
        id: string,
        count: number
}

export interface IUpdateConstructorBodyAction {
    readonly type: typeof UPDATE_CONSTRUCTOR_BODY;
    readonly data: IConstructorItems;
}

export interface IDeleteConstructorBodyAction {
    readonly type: typeof DELETE_CONSTRUCTOR_BODY;
    readonly index: number;
}

export interface IDndUpdateConstructorBodyAction {
    readonly type: typeof DND_UPDATE_CONSTRUCTOR_BODY;
    readonly newCards: IConstructorItems[];
}

export interface ICLearConstructorAction {
    readonly type: typeof CLEAR_CONSTRUCTOR;
}

export type TBurgerConstructorActions = 
    | IUpdateConstructorBunAction
    | IUpdateConstructorBodyAction
    | IDeleteConstructorBodyAction
    | IDndUpdateConstructorBodyAction
    | ICLearConstructorAction;

export interface IIncrementBunAction {
    readonly type: typeof INCREMENT_BUN;
    readonly payload: number;
}

export interface IIncrementBodyAction {
    readonly type: typeof INCREMENT_BODY;
    readonly price: number;
}

export interface IDecrementBunAction {
    readonly type: typeof DECREMENT_BUN;
    readonly payload: number;
}

export interface IDecrementBodyAction {
    readonly type: typeof DECREMENT_BODY;
    readonly price: number;
}

export interface ICleartotalPriceAction {
    readonly type: typeof CLEAR_TOTAL_PRICE;
}

export type TTotalPriceActions = 
    | IIncrementBunAction
    | IIncrementBodyAction
    | IDecrementBunAction
    | IDecrementBodyAction
    | ICleartotalPriceAction;

export interface IInitialState {
    BurgerIngredients: IFetchIngridient[],
    BurgerConstructorBun: Array<IConstructorItems>,
    BurgerConstructorBody: Array<IConstructorItems>,
    IngredientDetails: IFetchIngridient | IOrderObj | [],
    OrderDetails: IOrderDetails[],
    currentTab: string,
    totalPrice: number,
    auth: IAuthUser | null,
    spinner: boolean,
    wsStatus: string,
    wsError: string,
    feedList: IFeedList | null
}

export interface ISpinner {
    readonly type: typeof SPINNER;
    readonly payload: boolean;
}

export type TApplicationActions = 
    | TFeedActions
    | TTotalPriceActions
    | TBurgerConstructorActions
    | TBurgersActions
    | TTabSwitchActions
    | TOrderDetailsActions
    | TUserActions
    | ISpinner


export type AppDispatchThunk = ThunkDispatch<RootState, never, TApplicationActions>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    TApplicationActions
>

export interface IQuantityOrder  extends IFetchIngridient {
    quantity?: number
}
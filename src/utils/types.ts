import { rootReducer } from "../services/reducers/reducers";

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

export interface IWsActions {
    WsConnect:  string,
    WsDisconnect:  string,
    WsConnecting:  string,
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
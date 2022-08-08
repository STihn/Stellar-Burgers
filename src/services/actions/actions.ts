
export const FETCH_INGRIDIENTS = 'FETCH_INGRIDIENTS';
export const INGREDIENT_DETAILS = 'INGREDIENT_DETAILS';
export const DELETE_INGREDIENT_DETAILS  = 'DELETE_INGREDIENT_DETAILS';
export const TAB_BUN = 'TAB_BUN';
export const TAB_SAUSE = 'TAB_SAUSE';
export const TAB_MAIN = 'TAB_MAIN';
export const  UPDATE_CONSTRUCTOR_BUN = 'UPDATE_CONSTRUCTOR_BUN';
export const UPDATE_CONSTRUCTOR_BODY = 'UPDATE_CONSTRUCTOR_BODY';
export const INCREMENT_BUN = 'INCREMENT_BUN';
export const INCREMENT_BODY = 'INCREMENT_BODY';
export const DECREMENT_BUN = 'DECREMENT_BUN';
export const DECREMENT_BODY = 'DECREMENT_BODY';
export const DELETE_CONSTRUCTOR_BODY = 'DELETE_CONSTRUCTOR_BODY';
export const ORDER_DETAILS = 'ORDER_DETAILS';
export const DND_UPDATE_CONSTRUCTOR_BODY = 'DND_UPDATE_CONSTRUCTOR_BODY';
export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';
export const CLEAR_ORDER_DETAILS = 'CLEAR_ORDER_DETAILS';
export const CLEAR_TOTAL_PRICE = 'CLEAR_TOTAL_PRICE';
export const SPINNER = 'SPINNER';

export const baseUrl = 'https://norma.nomoreparties.space/api';

export const _checkResponse = (res: Response) => {
    if(res.ok) {
        return  res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}

export function fetchIngridients() {
    return async (dispatch: Function) => {
        try{
            dispatch({type: SPINNER, action: true})
            const res = await fetch(`${baseUrl}/ingredients`);
            const result = await _checkResponse(res);
            await dispatch({type: FETCH_INGRIDIENTS, BurgerIngredients: result.data})
            if(res.ok) {
                dispatch({type: SPINNER, action: false})
            }
            
        }
        catch(err) {
            console.log(err)
        }
    }
    
}

export function fetchOrderDetails(item: Array<string>) {
    return async (dispatch: Function) => {
        try {
            dispatch({type: SPINNER, action: true})
            const res = await fetch(`${baseUrl}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(item)
            });
            const result = await _checkResponse(res);
            dispatch({type: ORDER_DETAILS, OrderDetails: result})
            dispatch({type: CLEAR_CONSTRUCTOR})
            dispatch({type: CLEAR_TOTAL_PRICE})
            if(res.ok) {
                dispatch({type: SPINNER, action: false})
            }
        }
        catch(err) {
            console.log(err)
        }
    }
}



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

export const baseUrl = 'https://norma.nomoreparties.space/api';

export const _checkResponse = (res: any) => {
    if(res.ok) {
        return  res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}

export function fetchIngridients() {
    return async (dispatch: Function) => {
        try{
            const res = await fetch(`${baseUrl}/ingredients`);
            const result = await _checkResponse(res);
            return await dispatch({type: FETCH_INGRIDIENTS, BurgerIngredients: result.data})
        }
        catch(err) {
            console.log(err)
        }
        
    } 
}

export function fetchOrderDetails(item: Array<string>) {
    return async (dispatch: Function) => {
        try {
            const res = await fetch(`${baseUrl}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(item)
            });
            const result = await _checkResponse(res);
            return await dispatch({type: ORDER_DETAILS, OrderDetails: result})
        }
        catch(err) {
            console.log(err)
        }
    }
}


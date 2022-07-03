import { getCookie, setCookie } from "../../utils/utils";

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
export const AUTH_USER = 'AUTH_USER';

const baseUrl = 'https://norma.nomoreparties.space/api';

const _checkResponse = (res: any) => {
    if(res.ok) {
        return  res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}

export function fetchIngridients() {
    return async (dispatch: Function) => {
        try{
            const res = await fetch(`${baseUrl}/ingredients`);
            let result = await _checkResponse(res);
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
            let result = await _checkResponse(res);
            return await dispatch({type: ORDER_DETAILS, OrderDetails: result})
        }
        catch(err) {
            console.log(err)
        }
    }
}

export function registry(props: object) {
    return async (dispatch: Function) => {
        try {
            const res = await fetch(`${baseUrl}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(props)
            });
            let result = await _checkResponse(res);
            // console.log(result)
            // setCookie('token', result.accessToken)
            document.cookie = `accessToken=${result.accessToken}; max-age=1200`;
            localStorage.setItem('refreshToken', result.refreshToken)
            // return await dispatch({type: CREATE_USER, OrderDetails: result})
        }
        catch(err) {
            console.log(err)
        }
    }
}

export function login(props: object) {

    return async (dispatch: Function) => {
        try {
            const res = await fetch(`${baseUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization':  document.cookie
                },
                body: JSON.stringify(props)
            });
            let result = await _checkResponse(res);
            // console.log(result)
            // setCookie('token', result.accessToken)
            document.cookie = `accessToken=${result.accessToken}; max-age=1200`;
            localStorage.setItem('refreshToken', result.refreshToken)
            if(result.success) {
                return await dispatch({type: AUTH_USER,  user: {user: result.user, success: result.success}})
            }
        }
        catch(err) {
            console.log(err)
        }
    }
}

// export const registry = (props: object) => {
//     return fetch(`${baseUrl}/auth/register`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json;charset=utf-8",
//       },
//       body: JSON.stringify(props),
//     }).then(_checkResponse);
// };

export function forgotPassword(props: object) {
    return async (dispatch: Function) => {
        try {
            const res = await fetch(`${baseUrl}/password-reset`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(props)
            });
            let result = await _checkResponse(res);
            // return await dispatch({type: ORDER_DETAILS, OrderDetails: result})
        }
        catch(err) {
            console.log(err)
        }
    }
}

// export const forgotPassword = (props: object) => {
//     return fetch(`${baseUrl}/password-reset`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json;charset=utf-8",
//       },
//       body: JSON.stringify(props),
//     }).then(_checkResponse);
// };

export function resetPassword(props: object) {
    return async (dispatch: Function) => {
        try {
            const res = await fetch(`${baseUrl}/password-reset/reset`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(props)
            });
            let result = await _checkResponse(res);
            // return await dispatch({type: ORDER_DETAILS, OrderDetails: result})
        }
        catch(err) {
            console.log(err)
        }
    }
}

// export const resetPassword = (props: object) => {
//     return fetch(`${baseUrl}/password-reset/reset`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json;charset=utf-8",
//       },
//       body: JSON.stringify(props),
//     }).then(_checkResponse);
// };

export function logOut() {
    const refreshToken = localStorage.getItem('refreshToken');
    return async (dispatch: Function) => {
        try {
            const res = await fetch(`${baseUrl}/auth/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    // 'Authorization':  `${localStorage.getItem('refreshToken')}`
                },
                body: JSON.stringify({'token':`${refreshToken}`})
            });
            let result = await _checkResponse(res);
            
            // setCookie('token', result.accessToken)
            // document.cookie = `accessToken=${result.accessToken}; max-age=1200`;
            // localStorage.setItem('refreshToken', result.refreshToken)
            // if(result.success) {
            //     return await dispatch({type: AUTH_USER,  user: {user: result.user, success: result.success}})
            // }
        }
        catch(err) {
            console.log(err)
        }
    }
}

export function refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    return async (dispatch: Function) => {
        try {
            const res = await fetch(`${baseUrl}/auth/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    // 'Authorization':  `'token':${refreshToken}`
                },
                body: JSON.stringify({'token':`${refreshToken}`})
            });
            let result = await _checkResponse(res);
            console.log(result)
            // setCookie('token', result.accessToken)
            document.cookie = `accessToken=${result.accessToken}; max-age=1200`;
            localStorage.setItem('refreshToken', result.refreshToken)
            // if(result.success) {
            //     return await dispatch({type: AUTH_USER,  user: {user: result.user, success: result.success}})
            // }
        }
        catch(err) {
            console.log(err)
        }
    }
}
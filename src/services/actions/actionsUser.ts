import { getCookie } from "../../utils/utils";
import { baseUrl, _checkResponse } from "./actions";
export const AUTH_USER = 'AUTH_USER';
export const DELETE_USER = 'DELETE_USER';
export const CREATE_USER = 'CREATE_USER';

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
            document.cookie = `accessToken=${result.accessToken}; max-age=1200`;
            localStorage.setItem('refreshToken', result.refreshToken)
            return await dispatch({type: CREATE_USER, auth: result})
        }
        catch(err) {
            console.log(err)
        }
    }
}


export const login = (props: object) => {

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

            document.cookie = `accessToken=${result.accessToken}; max-age=1200`;
            localStorage.setItem('refreshToken', result.refreshToken)

            await dispatch({type: AUTH_USER,  user: {user: result.user, success: result.success}})
            return result;
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
                },
                body: JSON.stringify({'token':`${refreshToken}`})
            });
            let result = await _checkResponse(res);
            document.cookie = `accessToken=${result.accessToken}; max-age=1200`;
            localStorage.setItem('refreshToken', result.refreshToken)
        }
        catch(err) {
            console.log(err)
        }
    }
}

export const getUserInfo = () => {
    return async(dispatch: Function) => {
        try {
            const res = await fetch(`${baseUrl}/auth/user`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization': `${getCookie('accessToken')}`
                },
            });
            const result = await _checkResponse(res);
            await dispatch({type: AUTH_USER,  user: {user: result.user, success: result.success}})
        }
        catch(err) {
            console.log(err)
        }
    }
}
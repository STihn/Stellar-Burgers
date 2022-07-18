import { getCookie } from "../utils/utils";
import { baseUrl, _checkResponse } from "./actions/actions";


export const forgotPassword = (props: object) => {
    try {
        return fetch(`${baseUrl}/password-reset`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(props),
          }).then(_checkResponse)
    }
    catch(err) {
        console.log(err)
    }

};

export const resetPassword = (props: object) => {
    try {
        return fetch(`${baseUrl}/password-reset/reset`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(props),
          })
          .then(_checkResponse)
    }
    catch(err) {
        console.log(err)
    }
};

export function logOut() {
    const refreshToken = localStorage.getItem('refreshToken');
    try {
        return fetch(`${baseUrl}/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({'token':`${refreshToken}`})
        })
        .then(_checkResponse)
    }
    catch(err) {
        console.log(err)
    }
}

export function fetchChangeUser(props: any) {
    try {
        return fetch(`${baseUrl}/auth/user`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `${getCookie('accessToken')}`
            },
            body: JSON.stringify(props)
        })
        .then(_checkResponse)
    }
    catch(err) {
        console.log(err)
    }
}
import { AUTH_USER, DELETE_USER } from '../actions/actionsUser';
import { initialState } from './reducers';

export const userReducuer = (state = initialState, action: any) => {

    switch(action.type) {
        case AUTH_USER: {
            return {
                ...state,
                auth: action.user,
            }
        }
        case DELETE_USER: {
            return {
                ...state,
                auth: {},
            }
        }
        default: {
            return state
        }
    }
}

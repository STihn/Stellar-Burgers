import { IInitialState, TUserActions } from '../../utils/types';
import { AUTH_USER, DELETE_USER } from '../actions/actionsUser';
import { initialState } from './reducers';

export const userReducuer = (state: IInitialState = initialState, action: TUserActions): IInitialState => {
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
                auth: null,
            }
        }
        default: {
            return state
        }
    }
}

import { initialState } from './reducers';
import { WS_CONNECT, WS_OPEN, WS_CLOSE, WS_ERROR, WS_MESSAGE  } from '../actions/actionsFeed';

// WsStatus: 'OFFLINE',
// WsError: '',
// feedList: []

export const FeedReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case WS_CONNECT:
            return {
                ...state,
                WsStatus: 'CONNECTING',
                WsError: ''
            }
        case WS_CLOSE:
            return {
                ...state,
                WsStatus: 'OFFLINE',
                WsError: ''
            }
        case WS_ERROR: 
            return {
                ...state,
                WsStatus: 'OFFLINE',
                wsError: action.payload
            }
        case WS_MESSAGE:
            return {
                ...state,
                WsStatus: 'ONLINE',
                WsError: '',
                feedList: action.payload

            }
        case WS_OPEN:
            return {
                ...state,
                WsStatus: 'ONLINE',
                WsError: ''
            }
        default:
            return state
    }
}
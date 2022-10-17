import { initialState } from './reducers';
import {IWsActions} from '../../utils/types';
import { WSFeedActions } from '../actions/actionsFeed'

// WsStatus: 'OFFLINE',
// WsError: '',
// feedList: []

export const FeedReducer = (state = initialState, action: any) => {
    console.log(action, 'action')
    switch (action) {
        case WSFeedActions.WsConnect:
            return {
                ...state,
                WsStatus: 'CONNECTING',
                WsError: ''
            }
        case WSFeedActions.onClose:
            return {
                ...state,
                WsStatus: 'OFFLINE',
                WsError: ''
            }
        case WSFeedActions.onError: 
            return {
                ...state,
                WsStatus: 'OFFLINE',
                wsError: action.payload
            }
        case WSFeedActions.onMessage:
            return {
                ...state,
                WsStatus: 'ONLINE',
                WsError: '',
                feedList: action

            }
        case WSFeedActions.onOpen:
            return {
                ...state,
                WsStatus: 'ONLINE',
                WsError: ''
            }
        default:
            return state
    }
}
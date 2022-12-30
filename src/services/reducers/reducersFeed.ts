import { initialState } from './reducers';
import { WS_CONNECT, WS_OPEN, WS_CLOSE, WS_ERROR, WS_MESSAGE  } from '../actions/actionsFeed';
import { IFeedList, IInitialState, TFeedActions } from '../../utils/types';


export const FeedReducer = (state: IInitialState = initialState, action: TFeedActions): IInitialState => {
    switch (action.type) {
        case WS_CONNECT:
            return {
                ...state,
                wsStatus: 'CONNECTING',
                wsError: ''
            }
        case WS_CLOSE:
            return {
                ...state,
                wsStatus: 'OFFLINE',
                wsError: '',
                feedList: null
            }
        case WS_ERROR: 
            return {
                ...state,
                wsStatus: 'OFFLINE',
                wsError: action.payload
            }
        case WS_MESSAGE:
            return {
                ...state,
                wsStatus: 'ONLINE',
                wsError: '',
                feedList: action.payload

            }
        case WS_OPEN:
            return {
                ...state,
                wsStatus: 'ONLINE',
                wsError: ''
            }
        default:
            return state
    }
}
import { Middleware } from "redux";
import { IWsActions, RootState } from "../utils/types";


export const socketMiddleware = (wsActions: any) : Middleware<{}, RootState> => {
  let socket: WebSocket | null = null;
  console.log(wsActions, '2222')
  return ({dispatch}) => (next: any) => (action) => {
      // const { dispatch, getState } = store;
      // const { type, payload } = action;
      const { WsConnect, WsConnecting, onOpen, onClose, onError, onMessage, WsDisconnect } = wsActions;

      if (action.type === WsConnect) {
        socket = new WebSocket(action.action);
        // dispatch({type: WsConnect})
      }

      if (socket) {
        socket.onopen = event => {
          console.log(event)
          dispatch({ type: onOpen });
        };

        if(action.type === WsDisconnect) {
          socket.close();
        }

        socket.onerror = event => {
          console.log(event)
          dispatch({ type: onError, payload: JSON.stringify(event) });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          // const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: parsedData });
        };

        socket.onclose = event => {
          if(event.code !== 1000) {
            dispatch({ type: onError, payload: event.code.toString() });
          }else {
            dispatch({ type: onClose});
          }

        };
      }
      next(action);
  }
};
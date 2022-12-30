import { Middleware } from "redux";
import { IWsActions, RootState } from "../utils/types";


export const socketMiddleware = (wsActions: IWsActions) : Middleware<{}, RootState> => {
  let socket: WebSocket | null = null
  return ({dispatch}) => (next) => (action) => {

      const { wsConnect, wsConnecting, onOpen, onClose, onError, onMessage, wsDisconnect } = wsActions;

      if (action.type === wsConnect) {
        socket = new WebSocket(action.action);
      }

      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen });
        };

        if(action.type === wsDisconnect) {
          dispatch({type: onClose})
        }

        socket.onerror = event => {
          dispatch({ type: onError, payload: JSON.stringify(event) });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({ type: onMessage, payload: parsedData });
        };

        socket.onclose = event => {
          if(event.code !== 1000) {
            dispatch({ type: onError, payload: event.code.toString() });
            socket?.close();
          }else {
            dispatch({ type: onClose});
            socket?.close();
          }

        };
      }
      next(action);
  }
};
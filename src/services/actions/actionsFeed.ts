import { createAction } from "@reduxjs/toolkit";

// export const connect = createAction<string, 'WS_CONNECT'>('WS_CONNECT');
// export const WsDisconnect = createAction<string, 'WS_DISCONNECT'>('WS_DISCONNECT');
// export const WsConnecting = createAction<string, 'WS_CONNECTING'>('WS_CONNECTING');
// export const onOpen = createAction<string, 'WS_OPEN'>('WS_OPEN');
// export const onClose = createAction<string, 'WS_CLOSE'>('WS_CLOSE');
// export const onError = createAction<string, 'WS_ERROR'>('WS_ERROR');
// export const onMessage = createAction<string, 'WS_MESSAGE'>('WS_MESSAGE');


export const WS_CONNECT: 'WS_CONNECT' = 'WS_CONNECT';
export const WS_DISCONNECT: 'WS_DISCONNECT' = 'WS_DISCONNECT';
export const WS_CONNECTING: 'WS_CONNECTING' = 'WS_CONNECTING';
export const WS_OPEN: 'WS_OPEN' = 'WS_OPEN';
export const WS_CLOSE: 'WS_CLOSE' = 'WS_CLOSE';
export const WS_ERROR: 'WS_ERROR' = 'WS_ERROR';
export const WS_MESSAGE: 'WS_MESSAGE' = 'WS_MESSAGE';

export const wsFeedActions = {
    wsConnect: WS_CONNECT,
    wsDisconnect: WS_DISCONNECT,
    wsConnecting: WS_CONNECTING,
    onOpen: WS_OPEN,
    onClose: WS_CLOSE,
    onError: WS_ERROR,
    onMessage: WS_MESSAGE
};


import {connectedTask, receivedTask} from "../reducer/WebSocketReducer";

export const WebsocketMiddleware = store => {
    //initialise the socket connection before returning websocket middleware func

    console.log("set up websocket connection");
    let websocket = new WebSocket('ws://localhost:9000/websocket');

    websocket.onopen = () => store.dispatch(connectedTask());

    websocket.onmessage = (event) => {
        console.log('receiving ' + event.data);
        store.dispatch(receivedTask(event.data));
    };

    return next => action => {
        const {type} = action;
        switch (type) {
            case'SEND':
                websocket.send(action.request);
                break;
            default:
                break;
        }
        next(action);
    }
};
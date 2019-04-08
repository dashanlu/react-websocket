import {connectedTask, receivedTask} from "../reducer/WebSocketReducer";
import {byteArrayGenerator as generator} from "../util/ByteArrayGenerator";

export const WebsocketMiddleware = store => {
    const arrayBufferGenerator = generator;
    //initialise the socket connection before returning websocket middleware func

    console.log("set up websocket connection");
    let websocket = new WebSocket('ws://localhost:9000/websocket');
    let websocket1 = new WebSocket('ws://localhost:9000/websocket2');

    websocket.onopen = () => store.dispatch(connectedTask());
    websocket.onmessage = (event) => {
        store.dispatch(receivedTask(event.data));
    };


    let result;
    const fileReader = new FileReader();
    fileReader.addEventListener("loadend", () => {
        result = fileReader.result;
    });

    websocket1.onopen = () => store.dispatch(connectedTask());
    websocket1.onmessage = (event) => {
        console.log('receiving ' + event.data);
        console.log('fileReader obj ' + fileReader);
        fileReader.readAsArrayBuffer(event.data);
        console.log('result is ', result);
        const stringResult = String.fromCharCode.apply(null, new Uint8Array(result));
        store.dispatch(receivedTask(stringResult));
    };

    return next => action => {
        const {type, data_type} = action;
        switch (type) {
            case'SEND':
                console.log('sending ', action.request);
                if (data_type === 'BINARY') {
                    websocket1.send(arrayBufferGenerator(action.request));
                } else if (data_type === 'TEXT') {
                    websocket.send(action.request);
                }
                break;
            default:
                break;
        }
        next(action);
    }
};
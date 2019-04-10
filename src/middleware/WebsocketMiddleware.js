import {connectedTask, receivedTask} from "../reducer/WebSocketReducer";
import {Table} from "apache-arrow";
import {byteArrayGenerator as reqGenerator} from "../util/ByteArrayGenerator";

export const WebsocketMiddleware = store => {
    //initialise the socket connection before returning websocket middleware func

    console.log("set up websocket connection");
    let websocket = new WebSocket('ws://localhost:9000/websocket');
    let websocket1 = new WebSocket('ws://localhost:9000/websocket2');

    websocket.onopen = () => store.dispatch(connectedTask());
    websocket.onmessage = (event) => {
        store.dispatch(receivedTask(event.data));
    };


    //arrayBuffer to hold arrow date from server
    //TODO search a better way to read bufferArray
    let bufferArray;
    const fileReader = new FileReader();
    fileReader.addEventListener("loadend", () => {
        bufferArray = fileReader.result;
    });

    websocket1.onopen = () => store.dispatch(connectedTask());
    websocket1.onmessage = (event) => {
        console.log('receiving ' + event.data);
        console.log('fileReader obj ' + fileReader);
        fileReader.readAsArrayBuffer(event.data);
        // const stringResult = String.fromCharCode.apply(null, new Uint8Array(bufferArray));
        // console.log('string bufferArray ',stringResult);

        const table = Table.from(bufferArray);
        console.log('the table length ', table.length);

        table.schema.fields.map((d) => console.log('field ', d.name));
        const nameCol = table.getColumnAt(0);
        const ageCol = table.getColumnAt(1);
        if (nameCol && ageCol) {
            const responseObj = {name: nameCol.get(0), age: ageCol.get(0)}
            store.dispatch(receivedTask(responseObj));
        }
    };

    return next => action => {
        const {type, data_type} = action;
        switch (type) {
            case'SEND':
                console.log('sending ', action.request);
                if (data_type === 'BINARY') {
                    websocket1.send(reqGenerator(action.request));
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
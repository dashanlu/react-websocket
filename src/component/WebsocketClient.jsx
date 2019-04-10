import React, {Fragment} from 'react';
import {connect} from "react-redux";
import {connectTask, pingBinaryTask, pingTextTask} from "../reducer/WebSocketReducer";

const mapStateToProps = (state) => {
        const {websocket} = state;
        return ({
            websocket
        })
    }
;

const WebsocketClient = (props) => {
    const {
        websocket, dispatch
    } = props;
    console.log('current websocket state is ', websocket);
    const {status, size, currentResp = {}} = websocket;
    const statusInfo = 'Websocket status :' + status;
    const sizeOfMessages = 'number of requests :' + size;
    const {name = null, age = null} = currentResp;
    const currentResponse = 'current person name :' + name + ' and age :' + age;
    return (
        <Fragment>
            <div>{statusInfo}</div>
            <div>{sizeOfMessages}</div>
            <div>{currentResponse}</div>
            <button type={onsubmit} name="ping" onClick={() => dispatch(connectTask())}>establish websocket</button>
            <button type={onsubmit} name="ping text"
                    onClick={() => dispatch(pingTextTask(Math.random().toString(36).substring(7)))}>
                send text
            </button>
            <button type={onsubmit} name="ping binary"
                    onClick={() => dispatch(pingBinaryTask(Math.random().toString(36).substring(7)))}>
                send binary
            </button>
        </Fragment>
    );
};

export default connect(mapStateToProps)(WebsocketClient);


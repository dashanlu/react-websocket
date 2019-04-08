import React, {Fragment} from 'react';
import {connect} from "react-redux";
import {connectTask, pingTask} from "../reducer/WebSocketReducer";

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
    const {status, size, currentResp} = websocket;
    const statusInfo = 'Websocket status :' + status;
    const sizeOfMessages = 'messages :' + size;
    const currentResponse = 'current response :' + currentResp;
    return (
        <Fragment>
            <div>{statusInfo}</div>
            <div>{sizeOfMessages}</div>
            <div>{currentResponse}</div>
            <button name="ping" onClick={() => dispatch(connectTask())}>establish websocket</button>
            <button name="ping" onClick={() => dispatch(pingTask(Math.random().toString(36).substring(7)))}>send
            </button>
        </Fragment>
    );
};

export default connect(mapStateToProps)(WebsocketClient);


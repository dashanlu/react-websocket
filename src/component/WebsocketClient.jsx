import React, {Fragment} from 'react';
import {connect} from "react-redux";
import {connectTask, pingTask} from "../reducer/WebSocketReducer";

const mapStateToProps = (state) => {
        console.log(state);
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
    const {status, size} = websocket;
    const statusInfo = 'Websocket status :' + status;
    const sizeOfMessages = 'messages :' + size;
    return (
        <Fragment>
            <div>{statusInfo}</div>
            <div>{sizeOfMessages}</div>
            <button name="ping" onClick={() => dispatch(connectTask())}>establish websocket</button>
            <button name="ping" onClick={() => dispatch(pingTask())}>send</button>
        </Fragment>
    );
};

export default connect(mapStateToProps)(WebsocketClient);


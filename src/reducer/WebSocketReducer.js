export const websocketReducer = (state = {status: 'DISCONNECTED', size: 0, currentResp: {}}, action) => {
    const {size = 0} = state;
    switch (action.type) {
        case 'SENT':
            state = {status: 'CONNECTED', size};
            return state;
        case 'CONNECTED':
            state = {status: 'CONNECTED', size};
            return state;
        case 'RECEIVED':
            console.log('processing received data');
            state = {status: 'CONNECTED', size: size + 1, currentResp: action.response};
            return state;
        default:
            return state;
    }
};

export const pingTextTask = (req) => {
    console.log('fire pingTask');
    return {
        type: 'SEND',
        data_type: 'TEXT',
        request: req
    }
};

export const pingBinaryTask = (req) => {
    console.log('fire pingTask');
    return {
        type: 'SEND',
        data_type: 'BINARY',
        request: req
    }
};

export const connectedTask = () => ({
    type: 'CONNECTED'
});

export const connectTask = () => ({
    type: 'CONNECT'
});

export const receivedTask = (resp) => ({
    type: 'RECEIVED',
    response: resp
});

export const combinedReducer = {
    websocket: websocketReducer
};
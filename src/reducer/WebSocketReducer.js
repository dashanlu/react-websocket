export const websocketReducer = (state = {status: 'DISCONNECTED', size: 0}, action) => {
    const {status, size = 0} = state;
    switch (action.type) {
        case 'SENT':
            state = {status: 'CONNECTED', size};
            return state;
        case 'CONNECTED':
            state = {status: 'CONNECTED', size};
            return state;
        case 'RECEIVED':
            console.log('processing received data')
            console.log('current state', state);
            state = {status: 'CONNECTED', size: size + 1};
            return state;
        default:
            return state;
    }
};

export const pingTask = () => {
    console.log('fire pingTask');
    return {
        type: 'SEND'
    }
};

export const connectedTask = () => ({
    type: 'CONNECTED'
});

export const connectTask = () => ({
    type: 'CONNECT'
});

export const receivedTask = () => ({
    type: 'RECEIVED'
});

export const combinedReducer = {
    websocket: websocketReducer
};
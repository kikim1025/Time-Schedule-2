import { GET_DATA, FAIL } from './actions';

const initState = {};

function reducer(state = initState, action) {
    switch (action.type) {
        case GET_DATA:
            return Object.assign({}, state, {
                appointments: action.payload,
                note: ''
            });
        case FAIL:
            return Object.assign({}, state, { 
                note: 'Error'
            });
        default: 
            return state;
    };
};

export default reducer;
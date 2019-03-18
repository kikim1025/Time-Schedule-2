import {GET_DATA, FAIL, FAIL_INPUT} from '../constants/constants'

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
                note: 'Server Error'
            });
        case FAIL_INPUT:
            return Object.assign({}, state, { 
                note: 'Please check your input. Note that phone number has to be 10 digit long with no dashes.'
            });
        default: 
            return state;
    };
};

export default reducer;
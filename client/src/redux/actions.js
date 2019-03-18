import $ from 'axios';
import {GET_DATA, FAIL, FAIL_INPUT} from '../constants/constants'

// retrieve appointments data from server to redux store
export function getData() {
    return function(dispatch) {
        return (
            $.get('/api/appointments')
            .then((res) => {
                dispatch({ type: GET_DATA, payload: res.data.data });
            })
        );    
    };
};

// send appointments request to server, then relay success or duplicate fail response, with refreshed appointments data to store
export function sendAppointment(name, phone, day, hour) {
    return function(dispatch) {
        if (!name || isNaN(phone) || phone.length !== 10) {
            return dispatch({ type: FAIL_INPUT });
        } else {
            return (
                $.post('/api/appointments', { name: name, phone: phone, day: day, hour: hour })
                .then((res) => {
                    if (res.data.status === 200) {
                        dispatch({ type: GET_DATA, payload: res.data.data });
                    } else {
                        dispatch({ type: FAIL });
                    };
                })
            );
        };
    };
};

// send appointments update request to server, then relay success or duplicate fail response, with refreshed appointments data to store
export function updateAppointment(name, phone, day, hour) {
    return function(dispatch) {
        if (!name || isNaN(phone) || phone.length !== 10) {
            return dispatch({ type: FAIL_INPUT });
        } else {
            return (
                $.put('/api/appointments', { name: name, phone: phone, day: day, hour: hour })
                .then((res) => {
                    if (res.data.status === 200) {
                        dispatch({ type: GET_DATA, payload: res.data.data });
                    } else {
                        dispatch({ type: FAIL });
                    };
                })
            );
        };
    };
};
import $ from 'axios';

export const GET_DATA = 'GET_DATA';
export const FAIL = 'FAIL';

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
        return (
            $.post('/api/appointments', { name: name, phone: phone, day: day, hour: hour })
            .then((res) => {
                if (res.data.status === 200) {
                    dispatch({ type: GET_DATA, payload: res.data.data });
                } else {
                    dispatch({ type: FAIL });
                }
            })
        );    
    };
};

// send appointments update request to server, then relay success or duplicate fail response, with refreshed appointments data to store
export function updateAppointment(name, phone, day, hour) {
    return function(dispatch) {
        return (
            $.put('/api/appointments', { name: name, phone: phone, day: day, hour: hour })
            .then((res) => {
                if (res.data.status === 200) {
                    dispatch({ type: GET_DATA, payload: res.data.data });
                } else {
                    dispatch({ type: FAIL });
                }
            })
        );    
    };
};
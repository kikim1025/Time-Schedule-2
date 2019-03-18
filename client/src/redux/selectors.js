// This selector is used to process appointments data retrieved from server
// Colors are shown on client schedule UI to represent accesibility of each hour slots
export function selectColor(state, ownProps) {
    for (let e of state.appointments) {
        if (e.day === ownProps.day && e.hour === ownProps.hour) {
            return 'red'; // assigned already
        } 
    };
    return 'white'; // free to assign
};
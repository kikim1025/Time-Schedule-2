// This selector is used to process appointments data retrieved from server
// Colors are shown on client schedule UI to represent accesibility of each hour slots
export default function selector(state, ownProps) {
    for (let e of state.appointments) {
        if (e.day === ownProps.day && e.hour === ownProps.hour) {
            return { name: e.name, phone: e.phone, color: 'red' }; // assigned already
        };
    };
    return { name: '', phone: '', color: 'white' }; // free to assign
};
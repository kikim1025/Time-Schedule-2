// Simple array to keep track of appointments in object format
const appointments = [{ name: 'Ki', phone: '3012752346', day: 'Monday', hour: '11am' }];

// check if slot is already occupied
function checkDupAppointments(aList, a2) {
    for (let i = 0; i < aList.length; i++) {
        if (aList[i].day === a2.day && aList[i].hour === a2.hour) {
            return i;
        };
    };
    return -1;
};

// check if request has correct format
function checkReqForm(req){
    if (req.name && req.phone && req.day && req.hour && req.phone.length === 10) {
        return true;
    } else {
        return false;
    }
};


module.exports = function(app) {
    // Sends appointment data to client
    app.get('/api/appointments', function(req, res) {
        res.json({ status: 200, data: appointments});
    });
    
    // Post new appointment data from client then send success or failure
    app.post('/api/appointments', function (req, res) {
        if (checkReqForm(req)) {
            if (checkDupAppointments(appointments, req.body) === -1) {
                appointments.push({name: req.body.name, phone: req.body.phone, day: req.body.day, hour: req.body.hour});
                res.json({ status: 200, data: appointments});
            } else {
                res.json({ status: 403, message: 'Please use the website to send api requests!'});
            };
        } else {
            res.json({ status: 400 });
        }
        
    });

    // Update specific occupied day/hour with appointment data form client
    app.put('/api/appointments', function(req, res) {
        if (checkReqForm(req)) {    
            let dup = checkDupAppointments(appointments, req.body);
            if (dup === -1) {
                res.json({ status: 403, message: 'Please use the website to send api requests!'});
            } else {
                appointments[dup] = {name: req.body.name, phone: req.body.phone, day: req.body.day, hour: req.body.hour};
                res.json({ status: 200, data: appointments});
            }
        } else {
            res.json({ status: 400 });
        }
    });
};
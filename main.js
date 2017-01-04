/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var express = require('express'); // eenvoudige webserver in node js
var parser = require('body-parser'); // extensie op express voor eenvoudig body uit te lezen
var mongoose = require('mongoose'); // Aangeraden door Jonas Cristens (andere package dan MongoClient)

mongoose.connect('mongodb://localhost:27017/API'); //Databank dat je raadpleegt in Robomongo

// onze lokale 'datastore'. deze variable bewaart onze state.
var dalDevice = require('./StorageDevices.js');
var validateDevices = require('./ValidateDevices.js');

var dalAlarm = require('./StorageAlarms.js');
var validateAlarms = require('./ValidateAlarms.js');

// aanmaken van de webserver variabele
var app = express();
// automatische json-body parsers van request MET media-type application/json gespecifieerd in de request.
app.use(parser.json());



//Devices

app.get('/Devices', function (request, response) {
    dalDevice.AllDevices(function (err, device) {
        if(err){
            throw err;
        }
        response.send(device);
    });
});

// opvangen van een GET op /locaties/:naam_drone
app.get('/Devices/:id', function (request, response) {
    dalDevice.findDevices(request.params.id, function (err, Device) {
        if (Device) {
        response.send(Device);
    } else {
        err;
    }
    });
});

// opvangen van een POST op /locaties.
app.post("/Devices", function(request, response) {
    // de data in de body wordt toegekend aan onze locatie variabele.
    // deze is enkel opgevuld indien het JSON is.
    var Device = request.body;
    // Valideren dat velden bestaan
    var errors = validateDevices.fieldsNotEmpty(Device, "mac_address_device", "time_captured", "distance");
    if (errors) {
        response.status(400).send({
            message: "Following field(s) are mandatory:" + errors.concat()
        });
        return;
    }
    
    dalDevice.saveDevices(Device, function(err, device) {
        if(err){
            throw err;
        }
        response.send(device);
    });
});


app.put("/Devices/:id", function (request, response) {
    var Device = request.body;
    // Valideren dat velden bestaan
    var errors = validateDevices.fieldsNotEmpty(Device, "mac_address_device", "time_captured", "distance");
    if (errors) {
        response.status(400).send({
            message: "Following field(s) are mandatory:" + errors.concat()
        });
        return;
    }

    dalDevice.updateDevices(request.params.id, Device, function (err, Device) {
        if(err){
            throw err;
        }
        response.send(Device);
    });
});




//Alarms

app.get('/Alarms', function (request, response) {
    dalAlarm.AllAlarms(function (err, Alarm) {
        if(err){
            throw err;
        }
        response.send(Alarm);
    });
});

// opvangen van een GET op /bewegingen/:bewegingid
app.get('/Alarms/:id', function (request, response) {
    dalAlarm.findAlarms(request.params.id, function (err, Alarm) {
        if (Alarm) {
        response.send(Alarm);
    } else {
        err;
    }
    });
});

// opvangen van een POST op /bewegingen.
app.post("/Alarms", function(request, response) {
    // de data in de body wordt toegekend aan onze locatie variabele.
    // deze is enkel opgevuld indien het JSON is.
    var Alarm = request.body;
    // Valideren dat velden bestaan
    var errors = validateAlarms.fieldsNotEmpty(Alarm, "name_drone", "location", "type_alarm", "time_alarm", "notification", "type_notification", "important_alarm");
    if (errors) {
        response.status(400).send({
             message: "Following field(s) are mandatory:" + errors.concat()
        });
        return;
    }
    dalAlarm.saveAlarms(Alarm, function(err, Alarm) {
        if(err){
            throw err;
        }
        response.send(Alarm);
    });
});

app.listen(12345);
console.log("Check");

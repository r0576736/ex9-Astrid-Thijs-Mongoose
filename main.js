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
var validationDevices = require('./ValidateDevices.js');


// aanmaken van de webserver variabele
var app = express();
// automatische json-body parsers van request MET media-type application/json gespecifieerd in de request.
app.use(parser.json());

// opvangen van een GET op /locaties
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
    var errors = validationDevices.fieldsNotEmpty(Device, "mac_address_device", "time_captured", "distance");
    if (errors) {
        response.status(400).send({
            message: "Following field(s) are mandatory:" + errors.concat()
        });
        return;
    }
    /*
    Valideren:
    var existingDevice = dal.findDevice(Device.mac_address_device);
    if (existingDevice) {
        response.status(409).send({
            message: "mac_address_device moet uniek zijn!",
            link: "../Devices/" + existingdevice.id
        });
        return;
    }
    --Dit hoeft niet meer omdat we met moongoose zeggen dat ze uniek of niet uniek moeten zijn--
    */
    
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
    var errors = validationDevices.fieldsNotEmpty(Device, "mac_address_device", "time_captured", "distance");
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


app.listen(12345);
console.log("Check");

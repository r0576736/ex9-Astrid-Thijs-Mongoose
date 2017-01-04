//Ik heb zoals de andere ook mongoose uitgeprobeerd. 
//Met behulp van De code van Jelle heb ik dit proberen in te lezen in robomongo

var express = require('express');                                               //webserver in node js
var parser = require('body-parser');                                            //body uitlezen
var mongoose = require('mongoose');                                             //mongoose -- gekeken van Jelle Van Loock

mongoose.connect('mongodb://localhost:27017/API');                              //databank dat je raadpleegt in mongoose/robomongo

                                                                                
var dalDevice = require('./StorageDevices.js');                                 //locale datastore 'Devices'
var validateDevices = require('./ValidateDevices.js');                          //validatie op 'Devices'

var dalAlarm = require('./StorageAlarms.js');                                   //locale datastore 'Alarms'
var validateAlarms = require('./ValidateAlarms.js');                            //validatie op 'Alarms'

var dalWhiteList = require('./StorageWhiteLists.js');                           //locale datastore 'WhiteLists'
var validateWhiteLists = require('./ValidateWhiteLists.js');                    //validatie op 'WhiteLists'


var app = express();                                                            //variabele van webserver aangemaakt

app.use(parser.json());                                                         //automatische body parser, meegeven in request



//Devices

app.get('/Devices', function (request, response) {                              //toestellen opvragen van datastore 'Devices' met methode GET
    dalDevice.AllDevices(function (error, device) {
        if(error){
            throw errpr;                                                        //als het toestel niet bestaat, komt er een error 
        }
        response.send(device);                                                  //toestel weergeven wanneer het bestaat
    });
});


app.get('/Devices/:id', function (request, response) {                          //toestel opvragen aan de hand van de id met methode GET/:id
    dalDevice.findDevices(request.params.id, function (error, Device) {           //parameter id meegeven
        if (Device) {   
        response.send(Device);                                                  //bestaat de id, toestel weergeven
    } else {
        error;                                                                    //id bestaat niet, error weergeven
    }
    });
});


app.post("/Devices", function(request, response) {                              //toestel toevoegen via methode POST    
    var Device = request.body;                                                  //data toekennen aan body in json formaat

    var errors = validateDevices.fieldsNotEmpty(Device, "mac_address_device", "time_captured", "distance");     //data valideren
    if (errors) {
        response.status(400).send({
            message: "Following field(s) are mandatory:" + errors.concat()      //wanneer er nog velden leeg of onjuist ingevuld zijn, error.
        });
        return;                 
    }
    
    dalDevice.saveDevices(Device, function(error, device) {                       //Toestel opslagen aan de device lijst
        if(error){
            throw error;                                                          //als er iets mis gaat, error
        }
        response.send(device);                                                  //nieuwe toestel weergeven
    });
});

    
app.put("/Devices/:id", function (request, response) {                          //update toestel met nietuwe informatie met methode PUT
    var Device = request.body;                                                  //data toekennen aan body
    var errors = validateDevices.fieldsNotEmpty(Device, "mac_address_device", "time_captured", "distance");     //data valideren
    if (errors) {
        response.status(400).send({                                             //als er iets mis gaat, error
            message: "Following field(s) are mandatory:" + errors.concat()
        });
        return;                                                                 
    }

    dalDevice.updateDevices(request.params.id, Device, function (error, Device) { //toestel updaten in de lijst met toestellen
        if(error){
            throw error;                                                          //als er iets mis gaat, error
        }
        response.send(Device);                                                  //toestel met update(s) weergeven
    });
});




//Alarms

app.get('/Alarms', function (request, response) {                               //lijst met alle alarmen weergeven met methode GET
    dalAlarm.AllAlarms(function (err, Alarm) {                                  //alle alarmen opvragen in de datastore 'Alarms'
        if(err){
            throw err;                                                          //als er iets mis gaat, error
        }
        response.send(Alarm);                                                   //Lijst weergeven    
    });
});


app.get('/Alarms/:id', function (request, response) {                           //alarm met bepaalde id opvragen met methode GET/:id
    dalAlarm.findAlarms(request.params.id, function (error, Alarm) {            //id opzoeken in de datastore 'Alarms', id megeven als parameter
        if (Alarm) {
        response.send(Alarm);                                                   //id gevonden, alarm weergeven met specificaties
    } else {
        error;                                                                  //niet gevonden, error
    }
    });
});


app.post("/Alarms", function(request, response) {                               //alarm toevoegen aan de lijst met methode POST
    var Alarm = request.body;                                                   //data toekennen aan body in json formaat
    // Valideren dat velden bestaan
    var errors = validateAlarms.fieldsNotEmpty(Alarm, "name_drone", "location", "type_alarm", "time_alarm", "notification", "type_notification", "important_alarm");    //data valideren
    if (errors) {
        response.status(400).send({     
             message: "Following field(s) are mandatory:" + errors.concat()     //error weergeven als er velden leeg is of onjuist worden ingevuld
        });
        return;             
    }
    dalAlarm.saveAlarms(Alarm, function(error, Alarm) {                         //alarm opslagen in datastore 'Alarms'
        if(error){
            throw error;                                                        //gaat er iets mis, error
        }
        response.send(Alarm);                                                   //alarm opslagen
    });
});



//WhiteLists

app.get('/WhiteLists', function (request, response) {                           //lijst van whiteList weergeven met methode GET
    dalWhiteList.AllWhiteLists(function (error, WhiteList) {                    //alle records opvragen in de datastore 'WhiteLists'
        if(error){
            throw error;                                                        //is er iets mis, error
        }
        response.send(WhiteList);                                               //lijst weergeven
    });
});


app.get('/WhiteLists/:id', function (request, response) {                       //record van WhiteList opvragen met bepaalde id - met methode GET/:id
    dalAlarm.findWhiteLists(request.params.id, function (error, WhiteList) {    //id opzoeken in de datastore 'WhiteLists', id megeven als parameter
        if (WhiteList) {
        response.send(WhiteList);                                               //gevonden, record weergeven
    } else {
        error;                                                                  //error weergeven wanneer niet gevonden
    }
    });
});


app.post("/WhiteLists", function(request, response) {                           //record toevoegen aan WhitList met methode POST
    var WhiteList = request.body;                                               //data toekennen aan body in json formaat
    var errors = validateWhiteLists.fieldsNotEmpty(WhiteList, "name", "function_person", "mac_address_device", "type_device");  //data valideren
    if (errors) {
        response.status(400).send({
             message: "Following field(s) are mandatory:" + errors.concat()     //wanneer er lege velden zijn of onjuiste, error weergeven
        });
        return;         
    }
    dalWhiteList.saveWhiteLists(WhiteList, function(err, WhiteList) {           //recode opslagen in WhiteLists
        if(err){
            throw err;                                                          //gaat er iets mis, error
        }
        response.send(WhiteList);                                               //record weergeven in WhiteLists
    });
});


app.listen(12345);                                                              //server start op http://localhost:12345
console.log("API Check");                                                           //checken

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var mongoose = require("mongoose");
var AlarmsSchema = mongoose.Schema({                                            //schema inladen in mongoose
            ID: {
                type: Number,
                required: true,
                unique: true
            },
            
            name_drone: {                                                       //alle nodige velden met hun type
                type: String 
            },
 
            location: {
                type: String
            },
            
            type_alarm: {
                type: String
            },
                        
            time_alarm: {
                type: String 
            },
 
            notification: {
                type: Boolean
            },
            
            type_notification: {
                type: String
            },
            
            important_alarm: {
                type: Boolean
            }
});

var Alarm = module.exports = mongoose.model('Alarm', AlarmsSchema);             //variabele 'alarm' maken die we kunnen inladen in mongoose model

module.exports = {
    saveAlarms: function (Alarm, callback) {                                    //alarm opslagen in 'Alarms'
        Alarm.create(Alarm, callback);

    },
    
    AllAlarms : function(callback) {                                            //lijst met alle alarmen opvragen van 'Alarms'
        Alarm.find(callback);
    },

    findAlarms : function(id, callback){                                        //alarm opzoeken met id in 'Alarms'
        Alarm.find({alarmid:id}, callback);
    }
};

console.log("Storage Alarms check");                                            //check storage 'Alarms'

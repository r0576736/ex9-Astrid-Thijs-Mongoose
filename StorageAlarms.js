/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var mongoose = require("mongoose");
var AlarmsSchema = mongoose.Schema({
            ID: {
                type: Number,
                required: true,
                unique: true
            },
            
            name_drone: {
                type: String, 
            },
 
            location: {
                type: String
            },
            
            type_alarm: {
                type: String
            },
                        
            time_alarm: {
                type: String, 
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

var Alarm = module.exports = mongoose.model('Alarm', AlarmsSchema);

module.exports = {
    saveAlarms: function (Alarm, callback) {
        Alarm.create(Alarm, callback);

    },

    AllAlarms : function(callback) {
        Alarm.find(callback);
    },

    findAlarms : function(id, callback){
        Alarm.find({alarmid:id}, callback);
    }
};

console.log("Storage Alarms check");

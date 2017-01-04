/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var mongoose = require("mongoose");                     
var DevicesSchema = mongoose.Schema({                                           //schema inladen in mongoose
            ID: {
                type: Number,
                required: true,
                unique: true
            },
            
            mac_address_device: {                                               //alle nodige velden met hun type
                type: String, 
                required: true,
                unique: true
            },
 
            time_captured: {
                type: String
            },
            
            distance: {
                type: Number
            }
            
});

var Device = module.exports = mongoose.model('Device', DevicesSchema);          //variabele 'device' maken die we kunnen inladen in mongoose model

module.exports = {
    saveDevice: function (Device, callback) {                                  //toestel opslagen in 'Devices'
        Device.create(Device, callback);

    },

    AllDevices : function(callback) {                                           //lijst met alle toestellen opvragen van 'Devices'
        Devices.find(callback);
    },

    findDevice : function(id, callback){                                       //toestel opzoeken via id in 'Devices'
        Device.find({deviceid:id}, callback);
    }
};

console.log("Storage Devices check");                                           //check storage 'Devices'
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var mongoose = require("mongoose");
var DevicesSchema = mongoose.Schema({
            ID: {
                type: Number,
                required: true,
                unique: true
            },
            
            mac_address_device: {
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

var Device = module.exports = mongoose.model('Device', DevicesSchema);

module.exports = {
    saveDevices: function (Device, callback) {
        Device.create(Device, callback);

    },

    AllDevices : function(callback) {
        Device.find(callback);
    },

    findDevices : function(id, callback){
        Device.find({deviceid:id}, callback);
    }
};

console.log("Storage Devices check");
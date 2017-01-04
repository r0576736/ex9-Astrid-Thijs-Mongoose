/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

module.exports = {
    fieldsNotEmpty: function (object) {                                         //deze velden mogen niet leeg zijn
        "Device";
        var errors = [];
        var i = 1;
        if(typeof object["deviceid"] != "number"){
            errors.push(arguments[i]);
        }
        i++;
        if(typeof object["mac_address_device"] != "string"){
            errors.push(arguments[i]);
        }
        i++;
        if(typeof object["time_captured"] != "string"){
            errors.push(arguments[i]);
        }
        i++;
        if(typeof object["distance"] != "number"){
            errors.push(arguments[i]);
        }
        return errors.length === 0 ? null : errors;
    }

};

console.log("Validate Devices check");                                          //validate Devices check


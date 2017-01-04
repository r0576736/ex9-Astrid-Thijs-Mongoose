/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

module.exports = {
    fieldsNotEmpty: function (object) {
        "WhiteList";
        var errors = [];
        var i = 1;
        if(typeof object["whitelistid"] !== "number"){
            errors.push(arguments[i]);
        }
        i++;
        if(typeof object["name"] !== "string"){
            errors.push(arguments[i]);
        }
        i++;
        if(typeof object["function_person"] !== "string"){
            errors.push(arguments[i]);
        }
        i++;
        if(typeof object["mac_address_device"] !== "string"){
            errors.push(arguments[i]);
        }
        i++;
        if(typeof object["type_device"] !== "string"){
            errors.push(arguments[i]);
        }
        return errors.length === 0 ? null : errors;
    }

};

console.log("Validate WhiteLists check");




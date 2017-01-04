/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

module.exports = {
    fieldsNotEmpty: function (object) {
        "Alarm";
        var errors = [];
        var i = 1;
        if(typeof object["alarmid"] !== "number"){
            errors.push(arguments[i]);
        }
        i++;
        if(typeof object["name_drone"] !== "string"){
            errors.push(arguments[i]);
        }
        i++;
        if(typeof object["location"] !== "string"){
            errors.push(arguments[i]);
        }
        i++;
        if(typeof object["type_alarm"] !== "string"){
            errors.push(arguments[i]);
        }
        i++;
        if(typeof object["time_alarm"] !== "string"){
            errors.push(arguments[i]);
        }
        i++;
        if(typeof object["notification"] !== "boolean"){
            errors.push(arguments[i]);
        }
        i++;
        if(typeof object["type_notification"] !== "string"){
            errors.push(arguments[i]);
        }
        i++;
        if(typeof object["important_alarm"] !== "boolean"){
            errors.push(arguments[i]);
        }
        return errors.length === 0 ? null : errors;
    }

};

console.log("Validate Alarms check");



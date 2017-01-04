/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var mongoose = require("mongoose");
var WhiteListsSchema = mongoose.Schema({
            ID: {
                type: Number,
                required: true,
                unique: true
            },
            
            name: {
                type: String 
            },
 
            function_person: {
                type: String
            },
            
            mac_address_device: {
                type: String
            },
                        
            type_device: {
                type: String 
            }
});

var WhiteList = module.exports = mongoose.model('WhiteList', WhiteListsSchema);

module.exports = {
    saveWhiteLists: function (WhiteList, callback) {
        WhiteList.create(WhiteList, callback);

    },

    AllWhiteLists : function(callback) {
        WhiteList.find(callback);
    },

    findWhiteLists : function(id, callback){
        WhiteList.find({whitelistid:id}, callback);
    }
};

console.log("Storage WhiteLists check");


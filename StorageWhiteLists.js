/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var mongoose = require("mongoose");
var WhiteListsSchema = mongoose.Schema({                                        //schema inladen in mongoose
            ID: {
                type: Number,
                required: true,
                unique: true
            },
            
            name: {                                                             //alle nodige velden met hun type
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

var WhiteList = module.exports = mongoose.model('WhiteList', WhiteListsSchema); //variabele 'WhiteList' maken die we kunnen inladen in mongoose model

module.exports = {
    saveWhiteList: function (WhiteList, callback) {                            //record saven in 'WhiteLists'
        WhiteList.create(WhiteList, callback);

    },

    AllWhiteLists : function(callback) {                                        //gehele lijst opvragen van 'WhiteLists'
        WhiteLists.find(callback);
    },

    findWhiteList : function(id, callback){                                    //record opzoeken via id in 'WhiteLists'
        WhiteList.find({whitelistid:id}, callback);
    }
};

console.log("Storage WhiteLists check");                                        //check storage 'WhiteLists'


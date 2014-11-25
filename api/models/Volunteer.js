/**
* Volunteer.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    attributes: {
        email: 'string',
  	    password: 'string',
  	    freetimes: { 
            type:'array',
            array: true
        },	//array of datetime
  	 
        workunits: {
  		    collection: 'workunit',
  		    via: 'volunteers'
  	     },

        findIndexOf:function(time) {
            sails.log("array length :" + this.freetimes.length);
            var moment = require('moment');
            for (var i = 0; i < this.freetimes.length; i++){
                //temporary fix
                var obj = moment(this.freetimes[i]._i);
                sails.log("time: " + obj);
                sails.log("in time: " + time);
                if(obj.toString() == time.toString()){
                    sails.log("find duplicate");
                    return i;
                } 
            }
            return -1;
        }
    },

    beforeCreate:function(values, cb){
        volunteer.freetimes = [];
        cb();
    }
};


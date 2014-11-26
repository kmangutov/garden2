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
            for (var i = 0; i < this.freetimes.length; i++){
                var obj = this.freetimes[i];
                if(obj.toISOString() == time.toISOString()){
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


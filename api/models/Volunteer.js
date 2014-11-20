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
            if(typeof this.freetimes === "undefined")
                return false;
            for (var i = 0; i < this.freetimes.length; i++){
                sails.log(time + this.freetimes[i]);

                //TODO: object in freetimes is no longer moment object..
                if(time.diff(this.freetimes[i]) == 0)
                    return true;
            }
            return false;
        }
    }
};


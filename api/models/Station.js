/**
* Station.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    attributes: {
        name: 'string',
  	    workunits: {
  	  	    collection: 'workunit',
  		    via: 'station'
  	    },

        matchWorkUnits:function(){
            sails.log("in matchworkunit");
            //not sure this is most efficient way to populate workunits
            //because I can't test unless station has association with some workunits
            //and see if it has id or object in it
            //but for now this works 
            Station.find().where({id:this.id}).populate('workunits').exec(function(err, station){
                for (var w in this.workunits) {
                    //for all volunteer
                    Volunteer.find().exec(function(err, volunteers) {
                        volunteers.forEach(function(volunteer) {            
                            if (volunteer.workunits.length < 10 && 
                                volunteer.freetimes.length > 0 && 1) {
                                for (var t in volunteer.freetimes) {
                                    // compare freetimes vs workunit
                                    // and make association if match 
                                }
                            
                            } else {
                            //max reach, pass 
                            }

                        });
                    });
                }
            });
        }
    },
};


/**
* Station.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    schema: true,

    attributes: {
        name: {
            type: 'string',
            unique: true,
            required: true
        },

        workunits: {
            collection: 'workunit',
            via: 'station'
        },

        matchWorkUnits:function(workunits){
            sails.log("in matchworkunit");
            //not sure this is most efficient way to populate workunits
            //because I can't test unless station has association with some workunits
            //and see if it has id or object in it
            //but for now this works 
            for (var w in workunits) {
                //for all volunteer

                Volunteer.find().exec(function(err, volunteers) {
                    for (var volunteer in volunteers) {  
                        if (volunteer.workunits.length < 10 || volunteer.freetimes.length > 0) {
                            for (var t in volunteer.freetimes) {
                                // compare freetimes vs workunit
                                // and make association if match 
                                if (w.slot.toISOString() == t.toISOString()) {
                                    volunteer.workunits.add(w.id);
                                    w.volunteers.add(volunteer.id);

                                    //decrement need counter
                                    w.volunteersNeeded--;
                                }

                                //break inner loop if need count is 0
                                if (w.volunteersNeeded == 0 || volunteer.freetimes.length < 10)
                                    break;

                            }
                            
                        } 

                        //workunit is fulled, proceed next workunit
                        if(w.volunteersNeeded == 0)
                            break;

                        volunteer.save(function (err){

                        });

                    } //end for
                }); //end exec
            
                //saved all changes
                w.save(function (err) {

                });
            }
        },

        //remove all association with workunits / volunteers
        reset:function() {
            //var unitids = [];
            //Station.workunits
                
            //});

            //Volunteer.find().
        }
    }
};


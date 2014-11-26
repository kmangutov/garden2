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

        matchWorkUnits: function(workunits){
            sails.log("in matchworkunit: " + JSON.stringify(workunits));
            //not sure this is most efficient way to populate workunits
            //because I can't test unless station has association with some workunits
            //and see if it has id or object in it
            //but for now this works 

            //for (var w in workunits) {
            workunits.forEach(function(w){

                sails.log("w: " + JSON.stringify(w));
                //for all volunteer
                Volunteer.find().exec(function(err, volunteers) {
                    //for (var volunteer in volunteers) {  
                    volunteers.forEach(function(volunteer) {

                        sails.log("\n\n\tWorkUnit: " + JSON.stringify(w) + "\n\tVolunteer:" + JSON.stringify(volunteer));

                        if (volunteer.workunits.length < 10 || volunteer.freetimes.length > 0) {
                            volunteer.freetimes.forEach(function(t) {
                                // compare freetimes vs workunit
                                // and make association if match 

                                sails.log("\t\tVolunteer FreeTime:" + JSON.stringify(t));


                                var numVolunteers = 0;
                                if(w.volunteers)
                                  numVolunteers = w.volunteers.length;

                                if (w.slot == t && w.volunteersNeeded - numVolunteers > 0) {
                                    
                                    sails.log("Matched and saved volunteer.id:" + volunteer.id);
                                    //w.volunteers.add(volunteer.id);
                                    
                                    var newVolunteers = w.volunteers;
                                    newVolunteers.push(volunteer.id);

                                    sails.log("current volunteers: " + JSON.stringify(w.volunteers));
                                    w.volunteers.push(volunteer.id);
                                    sails.log("new volutneers: " + JSON.stringify(w.volunteers));   

                                    WorkUnit.update({id: w.id}, {volunteers: newVolunteers}).exec(function(err, updated) {

                                    });
                                    w.save(function (err) {
                                        if(err) {
                                            sails.log("fuck: " + err);
                                            
                                        }
                                    });
                                }   
                            });
                            
                        } 


                    }); //end for
                }); //end exec
            

            });
        },

        //remove all association with workunits / volunteers
        reset: function() {
            //var unitids = [];
            //Station.workunits
                
            //});

            //Volunteer.find().
        }
    }
};


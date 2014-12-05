/**
* WorkUnit.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var async = require('async');
var moment = require('moment');


module.exports = {

  schema: true,

  attributes: {
    
    slot: {
      type: 'string',
      required: true
    },

    volunteersNeeded: {
      type: 'integer',
      required: true
    },

    owner: {
      model: 'Station',
      via: 'workUnits',
      dominant: true
    },

    assignments: {
      collection: 'FreeUnit',
      via: 'assignment'
    },

    toString: function() {
      return this.owner.name + " " + this.slot;
    },

    // check for possible free units.
    // take into account if person is already volunteering for something else
    // at the same time (so he is ineligible) or 
    // if person has already reached max volunteer cap (ineligible also)
    possibleFreeUnit: function(next) {

      var MAX_WORK_CAP = 5;

      var freeUnits = Array();
      FreeUnit.find()
        .populate("owner")
        .where({slot: this.slot})
        .exec(function(err, units){
          
          var realUnits = [];


          /*units.forEach(function(unit) {
           
          });*/

          async.forEach(units,
            function(unit, callback) {
              unit.owner.numAssignedHours(function(hours){
                //sails.log(unit.owner.email + "@" + unit.slot + ":" + unit.assignment + "[" + hours + "]");

                if(unit.assignment == null && hours <= MAX_WORK_CAP)
                  realUnits.push(unit);
                callback();
              });
            },
            function(err) {
              next(realUnits);
            }
          );

          next(realUnits);
        });
    },

    tryMatch: function(next) {

      var self = this;
      FreeUnit.find().where({assignment: this.id})
      .exec(function(err, units) {
        sails.log(units.length + " >= " + self.volunteersNeeded + "?");
        if(units.length >= self.volunteersNeeded) {
          sails.log("this slot is filled");
          return next();
        }

        var placedTop = 3, placedBottom = 3;
        var potentialTop = 2, potentialBottom = 2;

        var potentialTopVolunteerIds = [];

        self.possibleFreeUnit(function(freeunits) {

          for(var i = 0; i < freeunits.length; i++) {
            var freeunit = freeunits[i];
            sails.log("Assign " + freeunit.toString() + " to " + self.toString());

            freeunit.assignment = self.id;
            freeunit.save(function(err) {
              WorkUnit.find().populate("assignments")
                .exec(function(err, workunit){});
            });
            return next(freeunit);
          }
        });
      });

      /*this.getTopPotentialFreeUnits(function(top) {
        sails.log("top freeunits");
        top.forEach(function(unit) {
          sails.log(unit.toString());
        });
      });*/


    },

    /*getTopAndBottomPotentialFreeUnits: function(next) {

      var that = this;
      this.getTop(function(top) {
        top.possibleFreeUnit(function(topFreeunits) {
          that.getBot(function(bot) {
            bot.possibleFreeUnit(function(botFreeunits) {
              next(topFreeunits, botFreeunits);
            });
          });
        });
      });
    },*/

    /*getTopPotentialVolunteerId: function(next) {

      var that = this;
      this.getTopPotentialFreeUnits(function(freeunits) {
        freeunits.forEach()
      });
    },*/

    getTopPotentialFreeUnits: function(next) {

      var that = this;
      this.getTop(function(top) {
        if(top == null) return next(null);
        top.possibleFreeUnit(function(topFreeunits) {
          next(topFreeunits);
        });
      });
    },

    getBotPotentialFreeUnits: function(next) {

      var that = this;
      this.getBot(function(bot) {
        if(bot == null) return next(null);
        bot.possibleFreeUnit(function(botFreeunits) {
          next(botFreeunits);
        });
      });
    },

    getTop: function(next) {

      var myMoment = moment(this.slot, "MM/DD/YYYY hh:mm a");
      var topSlot = myMoment.subtract(1, 'hours').format("MM/DD/YYYY hh:mm a");

      WorkUnit.findOne({slot: topSlot}, function(err, workunit){
        if(err)
          sails.log(err);

        next(workunit);
      });
    },

    getBot: function(next) {

      var myMoment = moment(this.slot, "MM/DD/YYYY hh:mm a");
      var topSlot = myMoment.add(1, 'hours').format("MM/DD/YYYY hh:mm a");

      WorkUnit.findOne({slot: topSlot}, function(err, workunit){
        if(err)
          sails.log(err);

        next(workunit);
      });
    }

  },

  doForEach: function(callback) {

    WorkUnit.find()
      .populate("owner")
      .populate("assignments")
      .exec(function(err, workunits){
        workunits.forEach(callback);
      });
  },

  unfilledWorkUnitDifficultyDescending: function(doneCallback) {

    var locals = [];

    WorkUnit.find()
      .populate("owner")
      .populate("assignments")
      .exec(function(err, workunits){

        async.forEach(workunits, 
          function(workunit, callback) {

            //skip workunits that are have met maximum capacity
            if(workunit.assignments.length >= workunit.volunteersNeeded)
              return callback();


            FreeUnit.find()
              .populate("owner")
              .where({slot: workunit.slot})
              .exec(function(err, freeunits){

                var obj = {workunit: workunit, freeunits: freeunits};
                locals.push(obj);

                callback();
              });
          },
          function(err) {

            locals.sort(function(a, b){

                //of a or b, which is harder to populate? put it first 

                // TODO: we might need to take into account a.workunit.volunteersNeeded
                // to determine which one is harder to populate

                return (a.freeunits.length) 
                  - (b.freeunits.length);
            });

            sails.log("before callback");
            doneCallback(locals);
          }
        );
      });
  },

  populatePossibleFreeUnit: function(callback) {

    WorkUnit.unfilledWorkUnitDifficultyDescending(function(locals) {
      if(locals.length == 0)
        return callback({});
      workunit = locals[0].workunit;
      workunit.tryMatch(function(f) {
        return callback(f);
      });
    });

    /*WorkUnit.findOne({id: 2}, function(err, unit) {

      unit.tryMatch(function(f) {
        callback(f);
      });
    });*/
  }
};


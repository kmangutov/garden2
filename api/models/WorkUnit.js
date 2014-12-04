/**
* WorkUnit.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

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
      model: 'FreeUnit',
      via: 'assignment'
    },

    possibleFreeUnit: {
      type: 'integer'
    },

    toString: function() {
      return this.owner.name + " " + this.slot;
    },

    possibleFreeUnit: function(next) {

      var freeUnits = Array();
      FreeUnit.find()
        .populate("owner")
        .where({slot: this.slot})
        .exec(function(err, units){

          this.possibleFreeUnit = units.length;
          this.save();

          next(units);
        });
    }
  },

  doForEach: function(callback) {

    WorkUnit.find()
      .populate("owner")
      .exec(function(err, workunits){
        workunits.forEach(callback);
      });
  }

};


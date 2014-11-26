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
      type: 'datetime',
      required: true
    },

    volunteersNeeded: {
      type: 'integer',
      required: true
    },

    volunteers: {
      collection: 'volunteer',
      via: 'workunits',
      dominant: true
    },

    station: {
      model: 'station',
      via: 'workunits',
      dominant: true
    }
  }

};


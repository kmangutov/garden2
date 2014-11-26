/**
* WorkUnit.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema: true,

  attributes: {
    
    slot: 'datetime',

    volunteersNeeded: 'integer',

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


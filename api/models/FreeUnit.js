/**
* FreeUnit.js
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

  	owner: {
  		model: 'Volunteer',
  		via: 'freeUnits',
      required: true
  	},

  	assignment: {
  		model: 'WorkUnit',
  		via: 'assignments'
  	}
  }
};


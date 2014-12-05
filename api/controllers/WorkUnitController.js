/**
 * WorkUnitController
 *
 * @description :: Server-side logic for managing Workunits
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  populateAllPossibleFreeUnit: function(req, res) {
  	WorkUnit.populatePossibleFreeUnit();
  }
};


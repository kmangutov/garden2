/**
 * WorkUnitController
 *
 * @description :: Server-side logic for managing Workunits
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	'add': function(req, res) {

		var slot = req.param("slot");
		var hoursneeded = req.param("hoursneeded");
		var station = req.param("station");

		WorkUnit.findBySlot(slot).exec(function(err, usr){
			sails.log(usr);
			if(err)
				return res.send(500, {error: "DB Error"});
			if(usr.length > 0)
				return res.send(400, {error: "Slot already exists"});

			WorkUnit.create({slot: slot, hoursneeded: hoursneeded, station: station}).exec(function(err, result){
				if(err)
					return res.send(500, {err: "Error! " + err});
				return res.send(result);
			});
		});
	},


	'index': function(req, res) {

		WorkUnit.find().exec(function(err, workunits){
			return res.send(workunits);
		})
	}
};


/**
 * StationController
 *
 * @description :: Server-side logic for managing stations
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	'create': function(req, res) {

		var name = req.param("name");

		Station.findByName(name).exec(function(err, usr){
			sails.log(usr);
			if(err)
				return res.send(500, {error: "DB Error"});
			if(usr.length > 0)
				return res.send(400, {error: "Station name exists"});

			Station.create({name: name}).exec(function(err, result){
				if(err)
					return res.send(500, {err: "Error! " + err});
				return res.send(result);
			});
		});
	},

	'index': function(req, res) {

		Station.find().exec(function(err, stations){
			return res.send(stations);
		})
		//return res.send(Station.find());
	}
};


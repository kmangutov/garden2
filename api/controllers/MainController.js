/**
 * MainController
 *
 * @description :: Server-side logic for managing Mains
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	authenticate: function(req, res) {
		var email = req.param("email");
		var password = req.param("password");


		Volunteer.findOneByEmail(email).exec(function(err, user){
			if(err)
				return res.json(500, {error: "DB Error"});
			if(!user)
				return res.json(404, {error: "User not found"});

			Volunteer.validPassword(password, user, function(err, valid) {
				if(err)
					return res.json(403, {error: "Forbidden"});
				if(!valid)
					return res.json(401, {error: "Invalid email or password"});
				else
					return res.json({user: user, token: sailsTokenAuth.issueToken(user.id)});
			});
		});
	},

	register: function(req, res) {
		var email = req.body.email;
		var password = req.body.password;

		if(!email || !password)
			return res.json(401, {error: "Missing email or password"});

		Volunteer.create({email: email, password: password}).exec(function(err, user) {
			if(err)
				return res.json(err.status, {error: "Error:" + err});
			if(user)
				return res.json({user: user, token: sailsTokenAuth.issueToken(user.id)});
		});
	},

	matchall: function(req, res) {
		Station.find()
		.populate('workunits')
		.exec(function(err, stations) {
			//for every station 
			if(err) 
				return res.send(500, {error:"DB error"});
		
			stations.forEach(function(station) {
				station.matchWorkUnits(station.workunits);
			});

			return res.send(200, {result:stations});
		});

	},

	matchWithId: function(req, res) {
		var sid = req.param("stationid");

		Station.find()
		.populate('workunits')
		.where({id:sid})
		.exec(function(err, station){
			station.matchWorkUnits(station.workunits);
		});
	},

	reset: function(req, res) {
		var sid = req.param("stationid");

		Station.find()
		.where({id:sid})
		.exec(function(err, station){
			if(err)
				return res.send(500, {error:"DB Error"});
			station.reset();
			return res.send(200, {result:station});
		});
	}
};


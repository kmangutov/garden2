/**
 * MainController
 *
 * @description :: Server-side logic for managing Mains
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var jwt = require('jsonwebtoken');

module.exports = {
	login: function(req, res) {
		var email = req.param("email");
		var password = req.param("password");


		Volunteer.findByEmail(email).exec(function(err, usr){
			sails.log(usr[0]);
			if(err)
				return res.send(500, {error: "DB Error"});
			if(usr.length > 0) {
				var jwtSecret = "secretl0l";
				var token = jwt.sign(usr, jwtSecret, {expiresInMinutes: 60*5});
				sails.log("login success token:" + token);
				return res.send(200, {user:usr, msg:"succeed", token: token});
			}
			else{
				req.session.user = null;
				return res.send(404, {error: "User not found"});
			}
		});
	},

	matchall: function(req, res) {
		Station.findAll().exec(function(err, stations) {
			//for every station 
			stations.forEach(function(station) {
				//for every workunits in the station
				station.populateAll().exec(function(err, workunit){
					//for all volunteer
					Volunteer.findAll().exec(function(err, volunteers) {
						volunteers.forEach(function(volunteer) {
							//compare datetime workunit vs volunteer
							//if anything match, make association between workunit and volunteer
							//no association with workunit yet
							if (typeof volunteer.workunits == 'undefined')
							{

							} else if (volunteer.workunits.length < 10) {

							} else {
								//max reach, pass 
							}

						});
					});
				});
			});
		});

	},

	matchWithId: function(req, res) {
		var sid = req.param("stationid");
		Station.find({id:sid}).exec(function(err, station)){

		}
	}
};


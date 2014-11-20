/**
 * VolunteerController
 *
 * @description :: Server-side logic for managing Volunteers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	'signup': function(req, res) {

		sails.log("In signup...");

		var email = req.param("email");
		var password = req.param("password");


		Volunteer.findByEmail(email).exec(function(err, usr){
			sails.log(usr);
			if(err)
				return res.send(500, {error: "DB Error"});
			if(usr.length > 0)
				return res.send(400, {error: "Email Taken"});

			Volunteer.create({email: email, password: password}).exec(function(err, result){
				if(err)
					return res.send(500, {err: "Error! " + err});
				return res.send(result);
			});
		});

	},

	'addFreeTime': function(req, res) {
		sails.log("add free time");
		//assume format is YYYY-MM-DD HH
		var timeStr = req.param('time');
		var moment = require('moment');

		if(!moment(timeStr).isValid())
			return res.send(500, {error:"Datetime format is not correct"});

		var time = moment(timeStr);
		sails.log("time add: " + timeStr + " to id" + req.session.user);

		if (req.session.user == null) {
			return res.send(500, {error:"You need to log in first"});
		} else {
			Volunteer.findOne({id:req.session.user}).exec(function(err, usr) {
				
				if(err)
					return res.send(500, {error:"DB Error"});
				else {
					if(typeof usr.freetimes === "undefined")
						usr.freetimes = [];
					if(usr.findIndexOf(time) == -1)
						return res.send(400, {error:"Cannot add same time slot"});

					usr.freetimes.push(time);
					usr.save(function(error) {
						return res.send(500, {error:"DB Error"});
					});
				
					return res.send(200, {msg:"time added", times:usr.freetimes});
				}
			});
		}
	},

	'removeFreeTime': function(req, res) {
		var timeStr = req.param('time');
		var moment = require('moment');

		if(!moment(timeStr).isValid())
			return res.send(500, {error:"Datetime format is not correct"});

		var time = moment(timeStr);

		if (req.session.user == null) {
			return res.send(500, {error:"You need to log in first"});
		} else {
			Volunteer.findOne({id:req.session.user}).exec(function(err, usr) {
				
				if(err)
					return res.send(500, {error:"DB Error"});
				else {
					var index = usr.findIndexOf(time);
					if(index == -1)
						return res.send(400, {error:"Cannot find time slot"});

					usr.freetimes.splice(index, 1);
					usr.save(function(error) {
						return res.send(500, {error:"DB Error"});
					});
				
					return res.send(200, {msg:"time added", times:usr.freetimes});
				}
			});
		}
	},

	'removeAll': function(req, res) {
		
		if (req.session.user == null) {
			return res.send(500, {error:"You need to log in first"});
		} else {
			Volunteer.findOne({id:req.session.user}).exec(function(err, usr) {
				
				if(err)
					return res.send(500, {error:"DB Error"});
				else {
					usr.freetimes = [];
				
					usr.save(function(error) {
						return res.send(500, {error:"DB Error"});
					});
				
					return res.send(200, {msg:"time cleared", times:usr.freetimes});
				}
			});
		}
	}
};


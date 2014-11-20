/**
 * MainController
 *
 * @description :: Server-side logic for managing Mains
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var jwt = require('jsonwebtoken');

module.exports = {
	'login': function(req, res) {
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
	}
};


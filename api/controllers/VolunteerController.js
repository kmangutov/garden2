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

	}
};


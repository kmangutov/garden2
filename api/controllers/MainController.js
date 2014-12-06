/**
 * MainController
 *
 * @description :: Server-side logic for managing Mains
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var moment = require('moment');

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
        return res.json(err.status, {error: "Email is already taken"});
      if(user)
        return res.json({user: user, token: sailsTokenAuth.issueToken(user.id)});
    });
  },

  resetAll: function(req, res) {

    FreeUnit.resetAll(function(err, profiles){

      if(err)
        return res.json(401, {error: "Some error"});
      return res.json(404, profiles);
    });
  },

  matchAll: function(req, res) {

    WorkUnit.populatePossibleFreeUnit(function(info) {

      //sails.log(moment("12/3/2014 03:00 am", "MM/DD/YYYY hh:mm a") + "");

      WorkUnit.doForEach(function(workunit) {

        var volunteers = "";
        async.forEach(workunit.assignments,
          function(freeunit, callback) {
            Volunteer.findOne({id: freeunit.owner}, function(err, volunteer) {
              volunteers += volunteer.email + " ";
              callback();
            });
          },
          function(err) {
            sails.log(workunit.toString() + ":" + volunteers);
          });


      });

      return res.json(404, info);
    });
  },

};

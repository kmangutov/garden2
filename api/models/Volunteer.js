/**
* Volunteer.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcrypt');
var async = require('async');

module.exports = {

  schema: true,

  attributes: {
    email: {
      type: 'string',
      unique: true,
      required: true
    },

    password: {
      type: 'string',
      required: true
    },

    admin: {
      type: 'boolean',
      defaultsTo: false
    },

    freeUnits: {
      collection: 'FreeUnit',
      via: 'owner'
    },

    numAssignedHours: function(next) {

      FreeUnit.find()
        .where({owner: this.id})
        .exec(function(err, freeunits) {

          var local = 0;
          async.forEach(freeunits, 
            function(freeunit, callback) {

              if(freeunit.assignment != null)
                local++;
              callback();
            },
            function(err) {

              next(local);
            }
          );
        });
    },

    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },

  listAssignedHours: function() {

    Volunteer.find()
      .exec(function(err, volunteers) {
        volunteers.forEach(function(volunteer){
          volunteer.numAssignedHours(function(hours) {
            sails.log("Volunteer: " + volunteer.email + " Hours:" + hours)
          });
        });
      });
  },

  beforeCreate: function(values, next) {
    values.freetimes = [];
    bcrypt.genSalt(10, function(err, salt) {
      if(err) return next(err);

      bcrypt.hash(values.password, salt, function(err, hash) {
        if(err) return next(err);

        values.password = hash;
        sails.log("Hashed password:" + hash);
        next();
      });
    });
  },

  validPassword: function(password, user, cb) {
    bcrypt.compare(password, user.password, function(err, match) {
      if(err) cb(err);
      if(match) {
        cb(null, true);
      } else {
        cb(err);
      }
    });
  }
};


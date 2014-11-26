/**
* Volunteer.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcrypt');

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

    freetimes: { 
      type:'array',
      array: true
    },

    workunits: {
      collection: 'workunit',
      via: 'volunteers'
    },

    findIndexOf: function(time) {
        sails.log("array length :" + this.freetimes.length);
        var moment = require('moment');
        for (var i = 0; i < this.freetimes.length; i++){
            //temporary fix
            var obj = moment(this.freetimes[i]._i);
            if(obj.diff(time)){
                sails.log("find duplicate");
                return i;
            }
        }
        return -1;
    },
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },

  beforeCreate: function(values, next) {
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


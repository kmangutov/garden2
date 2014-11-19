/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
 
module.exports = function(req, res, next) {

  var email = req.body.email;
  var password = req.body.password;

  if(email === "admin" && password === "admin") {
    sails.log("authenticated as admin");
    delete req.body.email;
    delete req.body.password;
    return next();
  }
  else
    return res.forbidden("Not permitted to perform this action"); 

  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller
  //if (req.session.authenticated) {
  //  return next();
  //}

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  //return res.forbidden('You are not permitted to perform this action.');
};

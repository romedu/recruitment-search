const {User}        = require("../models"),
      jwt           = require("jsonwebtoken"),
      {createError} = require("./error"),
      {SECRET_KEY}  = process.env;

exports.register = async (req, res, next) => {
   try {
      const {id, name, isCompany} = await User.create(req.body);
            token                 = jwt.sign({id, name, isCompany}, SECRET_KEY, {expiresIn: "1h"});

      res.status(200).json({
         id,
         token,
         name,
         isCompany
      });
   }
   catch(error){
      if(error.message) error = createError(409, error.message);
      next(error);
   }
};

exports.login = async (req, res, next) => {
   try {
      const user = await User.findOne({username: req.body.username});
  
      if(user && await user.comparePassword(req.body.password)){
         const {id, name, isCompany} = user,
               token = jwt.sign({id, name, isCompany}, SECRET_KEY, {expiresIn: "1h"});

         res.status(200).json({
            id,
            token,
            name,
            isCompany
         });
      }
      else throw createError(403, "Invalid username/password");
   }
   catch(error){
      next(error);
   }
}

exports.verifyToken = (req, res, next) => {
   const {_id: id, name, isCompany} = req.locals.currentUser._doc;
   return res.status(200).json({user: {id, name, isCompany}});
}

module.exports = exports;
exports.findUser = async (req, res, next) => {
   try {
      const {currentUser} = req.locals,
            {username, password, ...userData} = currentUser._doc;

      res.status(200).json({user: userData});
   }
   catch(error){
      next(error);
   }
}

module.exports = exports;
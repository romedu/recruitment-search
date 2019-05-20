exports.findUser = async (req, res, next) => {
   try {
      const {currentUser} = req.locals,
            {username, password, isCompany, ...userData} = currentUser;

      res.status(200).json({user: userData});
   }
   catch(error){
      next(error);
   }
}

module.exports = exports;
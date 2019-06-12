const bcrypt = require("bcryptjs"),
      mongoose = require("mongoose"),
      userSchema = new mongoose.Schema({
         username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 5,
            maxlength: 15
         },
         password: {
            type: String,
            required: true,
            trim: true,
            minlength: 8
         },
         isCompany: {
            type: Boolean,
            default: false
         },
         name: {
            type: String,
            required: true,
            trim: true
         },
         nationalId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            maxlength: 11
         },
         competences: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Competence"
         }],
         languages: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Language"
         }],
         trainings: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Training"
         }],
         workingExperiences: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "WorkingExperience"
         }],
         positions: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Position"
         }],
         applications: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Candidate"
         }]
      });

userSchema.pre("save", async function(next){
   try {
      // If the password is being updated, hash the new password
      if(this.isModified("password")){
         const hashedPassword = await bcrypt.hash(this.password, 8);
         this.password = hashedPassword;
      }

      next();
   }
   catch(error){
      next(error);
   }
});

userSchema.methods.comparePassword = async function(passwordEntered, next){
   try{
      const passwordComparison = await bcrypt.compare(passwordEntered, this.password);
      return passwordComparison;
   }
   catch(error){
      next(error);
   }
}

module.exports = mongoose.model("User", userSchema);
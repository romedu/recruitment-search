const mongoose = require("mongoose"),
      {createError} = require("../helpers/error"),
      workingExperienceSchema = new mongoose.Schema({
         companyName: {
            type: String,
            required: [true, "Company name is required."],
            trim: true
         },
         position: {
            type: String,
            required: [true, "Position is required."],
            trim: true
         },
         startingDate: {
            type: Date,
            required: [true, "Starting date is required."],
            max: Date.now()
         },
         endingDate: {
            type: Date, 
            required: [true, "Ending date is required."],
            max: Date.now()
         },
         salary: {
            type: Number,
            required: [true, "Salary is required."],
            min: [0, "Salary must be equal o greater than 0."]
         }
      });

workingExperienceSchema.pre("save", function(next){
   if(this.startingDate > this.endingDate) return next(createError(400, "Ending date must be greater than the starting date."));
   next();
})

module.exports = mongoose.model("WorkingExperience", workingExperienceSchema);
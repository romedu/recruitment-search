const mongoose = require("mongoose"),
      {createError} = require("../helpers/error"),
      workingExperienceSchema = new mongoose.Schema({
         companyName: {
            type: String,
            required: true,
            trim: true
         },
         position: {
            type: String,
            required: true,
            trim: true
         },
         startingDate: {
            type: Date,
            required: true,
            max: Date.now()
         },
         endingDate: {
            type: Date, 
            required: true,
            max: Date.now()
         },
         salary: {
            type: Number,
            required: true
         }
      });

workingExperienceSchema.pre("save", function(next){
   if(this.startingDate > this.endingDate) return next(createError(400, "Starting date can't be greater than the ending date"));
   next();
})

module.exports = mongoose.model("WorkingExperience", workingExperienceSchema);
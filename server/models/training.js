const mongoose = require("mongoose"),
      {createError} = require("../helpers/error"),
      trainingSchema = new mongoose.Schema({
         description: {
            type: String,
            required: [true, "Description is required."],
            trim: true
         },
         level: {
            type: String,
            required: [true, "Level is required."],
            trim: true
         },
         institution: {
            type: String,
            required: [true, "Institution is required."],
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
         }
      });
      
trainingSchema.pre("save", function(next){
   if(this.startingDate > this.endingDate) return next(createError(400, "Ending date must be greater than the starting date."));
   next();
})

module.exports = mongoose.model("Training", trainingSchema);
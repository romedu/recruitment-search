const mongoose = require("mongoose"),
      {createError} = require("../helpers/error"),
      trainingSchema = new mongoose.Schema({
         description: {
            type: String,
            required: true,
            trim: true
         },
         level: {
            type: String,
            required: true,
            trim: true
         },
         institution: {
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
         }
      });
      
trainingSchema.pre("save", function(next){
   if(this.startingDate > this.endingDate) return next(createError(400, "Starting date can't be greater than the ending date"));
   next();
})

module.exports = mongoose.model("Training", trainingSchema);
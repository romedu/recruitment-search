const mongoose = require("mongoose"),
      workingExperienceSchema = new mongoose.Schema({
         companyName: {
            type: String,
            required: true
         },
         position: {
            type: String,
            required: true
         },
         startingDate: {
            type: Date,
            required: true
         },
         endingDate: {
            type: Date, 
            required: true
         },
         salary: {
            type: Number,
            required: true
         }
      });

module.exports = mongoose.model("WorkingExperience", workingExperienceSchema);
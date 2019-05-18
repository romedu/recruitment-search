const mongoose = require("mongoose"),
      trainingSchema = new mongoose.Schema({
         description: {
            type: String,
            required: true
         },
         level: {
            type: String,
            required: true
         },
         institution: {
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
         }
      });

module.exports = mongoose.model("Training", trainingSchema);
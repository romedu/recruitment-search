const mongoose = require("mongoose"),
      mongoosePaginate = require('mongoose-paginate-v2'),
      candidateSchema = new mongoose.Schema({
         position: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Position",
            required: [true, "Position is required."]
         },
         department: {
            type: String,
            required: [true, "Position is required."],
            trim: true
         },
         aspiringSalary: {
            type: Number,
            required: [true, "Aspiring salary is required."],
            min: [0, "Aspiring salary must be equal o greater than 0."]
         },
         recommendedBy: {
            type: String,
            default: "n/a",
            trim: true
         },
         userData: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User data is required."]
         }
      });
      
mongoose.plugin(mongoosePaginate);

module.exports = mongoose.model("Candidate", candidateSchema);
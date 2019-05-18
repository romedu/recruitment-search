const mongoose = require("mongoose"),
      candidateSchema = new mongoose.Schema({
         position: {
            type: mongoose.Schema.Types.ObjectId,
            rel: "Position",
            required: true
         },
         department: {
            type: String,
            required: true
         },
         aspiringSalary: {
            type: Number,
            required: true
         },
         recommendedBy: {
            type: String,
            default: "n/a"
         },
         userData: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            unique: true,
            required: true
         }
      });

module.exports = mongoose.model("Candidate", candidateSchema);
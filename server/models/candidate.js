const mongoose = require("mongoose"),
      mongoosePaginate = require('mongoose-paginate-v2'),
      candidateSchema = new mongoose.Schema({
         position: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Position",
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
            required: true
         }
      });
      
mongoose.plugin(mongoosePaginate);

module.exports = mongoose.model("Candidate", candidateSchema);
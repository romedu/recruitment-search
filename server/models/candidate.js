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
            required: true,
            trim: true
         },
         aspiringSalary: {
            type: Number,
            required: true,
            min: 0
         },
         recommendedBy: {
            type: String,
            default: "n/a",
            trim: true
         },
         userData: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
         }
      });
      
mongoose.plugin(mongoosePaginate);

module.exports = mongoose.model("Candidate", candidateSchema);
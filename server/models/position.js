const mongoose = require("mongoose"),
      positionSchema = new mongoose.Schema({
         name: {
            type: String,
            required: true
         },
         riskLevel: {
            type: String,
            required: true
         },
         minimumSalary: {
            type: Number,
            required: true
         },
         maximumSalary: {
            type: Number,
            required: true
         },
         state: {
            type: Boolean,
            default: true
         },
         company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
         }
      });

module.exports = mongoose.model("Position", positionSchema);
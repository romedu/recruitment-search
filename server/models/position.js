const mongoose = require("mongoose"),
      mongoosePaginate = require('mongoose-paginate-v2'),
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

mongoose.plugin(mongoosePaginate);

module.exports = mongoose.model("Position", positionSchema);
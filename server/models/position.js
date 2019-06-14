const mongoose = require("mongoose"),
      {createError} = require("../helpers/error"),
      mongoosePaginate = require('mongoose-paginate-v2'),
      positionSchema = new mongoose.Schema({
         name: {
            type: String,
            required: [true, "Name is required."],
            trim: true
         },
         riskLevel: {
            type: String,
            required: [true, "Risk level is required."],
            trim: true
         },
         minimumSalary: {
            type: Number,
            required: [true, "Minimum salary is required."],
            min: [0, "Minimum salary must be equal o greater than 0."]
         },
         maximumSalary: {
            type: Number,
            required: [true, "Maximum salary is required."],
            min: [0, "Maximum salary must be equal o greater than 0."]
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

positionSchema.pre("save", function(next){
   if(this.minimumSalary > this.maximumSalary) return next(createError(400, "Maximum salary must be greater than the minimum salary."));
   next();
})

mongoose.plugin(mongoosePaginate);

module.exports = mongoose.model("Position", positionSchema);
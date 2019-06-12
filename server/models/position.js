const mongoose = require("mongoose"),
      {createError} = require("../helpers/error"),
      mongoosePaginate = require('mongoose-paginate-v2'),
      positionSchema = new mongoose.Schema({
         name: {
            type: String,
            required: true,
            trim: true
         },
         riskLevel: {
            type: String,
            required: true,
            trim: true
         },
         minimumSalary: {
            type: Number,
            required: true,
            min: 0
         },
         maximumSalary: {
            type: Number,
            required: true,
            min: 0
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
   if(this.minimumSalary > this.maximumSalary) return next(createError(400, "Minimum salary can't be greater than the maximum salary"));
   next();
})

mongoose.plugin(mongoosePaginate);

module.exports = mongoose.model("Position", positionSchema);
const mongoose = require("mongoose"),
      mongoosePaginate = require('mongoose-paginate-v2'),
      employeeSchema = new mongoose.Schema({
         startingDate: {
            type: Date,
            default: Date.now()
         },
         position: {
            type: String,
            required: true,
            trim: true
         },
         department: {
            type: String,
            required: true,
            trim: true
         },
         monthlySalary: {
            type: Number,
            required: true,
            min: 0
         },
         state: {
            type: Boolean,
            default: true
         },
         userData: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
         },
         company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
         }
      });

mongoose.plugin(mongoosePaginate);

module.exports = mongoose.model("Employee", employeeSchema);
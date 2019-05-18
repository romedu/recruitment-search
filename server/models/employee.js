const mongoose = require("mongoose"),
      employeeSchema = new mongoose.Schema({
         startingDate: {
            type: Date,
            required: true
         },
         position: {
            type: String,
            required: true
         },
         department: {
            type: String,
            required: true
         },
         monthlySalary: {
            type: Number,
            required: true
         },
         state: {
            type: Boolean,
            default: true
         },
         userData: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
         },
         company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
         }
      });

module.exports = mongoose.model("Employee", employeeSchema);
const mongoose = require("mongoose"),
      employeeSchema = new mongoose.Schema({
         startingDate: {
            type: Date,
            default: Date.now()
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
            ref: "User",
            required: true
         },
         company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
         }
      });

module.exports = mongoose.model("Employee", employeeSchema);
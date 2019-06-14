const mongoose = require("mongoose"),
      mongoosePaginate = require('mongoose-paginate-v2'),
      employeeSchema = new mongoose.Schema({
         startingDate: {
            type: Date,
            default: Date.now()
         },
         position: {
            type: String,
            required: [true, "Position is required."],
            trim: true
         },
         department: {
            type: String,
            required: [true, "Department is required."],
            trim: true
         },
         monthlySalary: {
            type: Number,
            required: [true, "Monthly salary is required."],
            min: [0, "Monthly salary must be equal o greater than 0."]
         },
         state: {
            type: Boolean,
            default: true
         },
         userData: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User data is required."]
         },
         company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Company is required."]
         }
      });

mongoose.plugin(mongoosePaginate);

module.exports = mongoose.model("Employee", employeeSchema);
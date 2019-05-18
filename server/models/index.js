const mongoose = require("mongoose");

mongoose.set("debug", true);
mongoose.connect(process.env.DBURL, {useNewUrlParser: true});
mongoose.Promise = Promise;

exports.User = require("./user");
exports.Training = require("./training");
exports.Position = require("./position");
exports.Competence = require("./competence");
exports.Candidate = require("./candidate");
exports.Employee = require("./employee");
exports.WorkingExperience = require("./working-experience");
exports.Language = require("./language");

module.exports = exports;
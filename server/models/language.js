const mongoose = require("mongoose"),
      languageSchema = new mongoose.Schema({
         name: {
            type: String,
            required: true
         },
         state: {
            type: Boolean,
            default: true
         }
      });

module.exports = mongoose.model("Language", languageSchema)
const mongoose = require("mongoose"),
      competenceSchema = new mongoose.Schema({
         description: {
            type: String,
            required: true
         },
         state: {
            type: Boolean,
            default: true
         }
      });

module.exports = mongoose.model("Competence", competenceSchema);
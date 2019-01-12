var mongoose = require("mongoose");

var reportSchema = new mongoose.Schema({
  location: String,
  image: String,
  description: String,
  
});

module.exports = mongoose.model("report", reportSchema);
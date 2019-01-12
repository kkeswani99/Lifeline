var mongoose = require("mongoose");
//SCHEMA SETUP
var accidentSchema = new mongoose.Schema({
	name: String,
	place: String,
	image: String,
	description: String,
	author: {
		id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "User"
		},
		username: String
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

module.exports = mongoose.model("Accident",accidentSchema);

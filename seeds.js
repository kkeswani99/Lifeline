var mongoose  = require("mongoose");
var Comment   = require("./models/comment");
var Accident  = require("./models/accident");


var data = [
	{
		name: "Cloud's Rest", 
		image: "https://images.unsplash.com/photo-1541286347099-f75ffda21f00?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1fa15a9396063c4faaf2a231eb9c7149&auto=format&fit=crop&w=500&q=60",
		description: "Culpa minim dolor sit amet, consectetur reprehenderit elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	},
	{
		name: "Desert Mesa", 
		image: "https://images.unsplash.com/photo-1541296604437-8cb5efd2da96?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=dc26c6b7c3e38e3b5c89cc5f61e1d3a1&auto=format&fit=crop&w=500&q=60",
		description: "Culpa minim dolor sit amet, consectetur reprehenderit elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	},
	{
		name: "Canyon Floor", 
		image: "https://images.unsplash.com/photo-1541269629443-a45894594110?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8cb06b33effa4bc37c9d751471a85bca&auto=format&fit=crop&w=500&q=60",
		description: "Culpa minim dolor sit amet, consectetur reprehenderit elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	}
]


function seedDB()
{
	//Remove all campgrounds
	Accident.remove({}, function(err){
	if(err)
	{
		console.log(err);
	}
	console.log("removed accidents");

		//add a few campgrounds
		data.forEach(function(seed){
		Accident.create(seed, function(err,accident){
			if(err)
			{
				console.log(err);
			}
			else
			{
				console.log("Added an accident");
				//create a comment
				Comment.create({
					text: "This place is great but i wish i had internet",
					author: "Homer"
				}, function(err, comment){
					if(err)
					{
						console.log(err);
					}
					else
					{
						accident.comments.push(comment);
						accident.save();
						console.log("Created a new accident");
					}
				});
			}
		})
		});


	});

	
}

module.exports = seedDB;
var Accident = require("../models/accident");
var Comment = require("../models/comment");
//all the middleware code goes here
var middlewareObj = {};

middlewareObj.CheckAccidentOwnership = function(req,res,next){
	if(req.isAuthenticated())
	{
		Accident.findById(req.params.id, function(err,foundAccident){
			if(err)
			{
				req.flash("error", "Accident not found");
				res.redirect("back");
			}
			else
			{
				if(foundAccident.author.id.equals(req.user._id))
				{
					next();
				}
				else
				{
					req.flash("error", "You do not have permission to do that");
					res.redirect("back");
				}	
			}
			});	
	} 
	else
	{
		req.flash("error", "You need to Logged in to do that ");
		res.redirect("back");
	}
}

middlewareObj.CheckCommentOwnership = function(req,res,next)
{
	if(req.isAuthenticated())
	{
    	Comment.findById(req.params.comment_id, function(err,foundComment){
      	if(err)
      	{
        	res.redirect("back");
      	}
      	else
      	{
        	//does user owns the comment
        	if(foundComment.author.id.equals(req.user._id))
        	{
          		next();
        	}
        	else
        	{
        		req.flash("error", "You do not have permission to do that ");
          		res.redirect("back");
        	} 
      	}
      	}); 
  	} 
  	else
  	{
  		req.flash("error", "You need to Logged in to do that ");
    	res.redirect("back");
  	}
}

middlewareObj.isLoggedIn = function(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  req.flash("error", "You need to be logged in to do that");
  res.redirect("/login");
}
module.exports = middlewareObj;
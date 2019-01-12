var express    = require("express");
var router     = express.Router({mergeParams: true});
var Accident   = require("../models/accident");
var Comment    = require("../models/comment");
var middleware = require("../middleware");
//Coments New
router.get("/new", middleware.isLoggedIn, function(req,res){
  //find accidents by id
  Accident.findById(req.params.id, function(err, accident){
    if(err)
    {
      console.log(err);
    }
    else
    {
        res.render("comments/new", {accident: accident});
    }
  });
});

//Comments Create
router.post("/", middleware.isLoggedIn, function(req,res){
    //lookup for accident using id
    Accident.findById(req.params.id, function(err, accident){
      if(err)
      {
        console.log(err);
        res.redirect("/accidents");
      }
      else
      {
          Comment.create(req.body.comment, function(err, comment){
              if(err)
              {
                req.flash("error","Something went wrong!!");
                console.log(err);
              }
              else
              {
              	//add username and id to comment
              	comment.author.id = req.user._id;
              	comment.author.username = req.user.username;
              	//save comment
              	comment.save();
                accident.comments.push(comment);
                accident.save();
                req.flash("success","Successfully added comment");
                res.redirect('/accidents/' + accident._id);
              }
          });
      }
    });
});

//COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.CheckCommentOwnership, function(req,res){
  Comment.findById(req.params.comment_id, function(err, foundComment){
    if(err)
    {
      res.redirect("back");
    }
    else
    {
        res.render("comments/edit", {accident_id: req.params.id, comment: foundComment});
    }
  });
});
//COMMENT UPDATE ROUTE
router.put("/:comment_id",middleware.CheckCommentOwnership, function(req,res){
  Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment, function(err, updatedComment){
    if(err)
    {
      res.redirect("back");
    }
    else
    {
      res.redirect("/accidents/"+req.params.id);
    }
  })
});

//COMMENT DESTROY ROUTE
router.delete("/:comment_id",middleware.CheckCommentOwnership, function(req,res){
  Comment.findByIdAndRemove(req.params.comment_id, function(err){
    if(err)
    {
      res.redirect("back");
    }
    else
    {
        req.flash("success", "Comment deleted");
        res.redirect("/accidents/" + req.params.id);
    }
  });
});
module.exports = router;
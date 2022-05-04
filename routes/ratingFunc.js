const express = require('express');
const routers=express.Router();
const PostModel=require('../models/postModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('../controller/verifyToken');
const CommentModel=require('../models/commentModel');
const RatingModel=require('../models/ratingModel');
const ratingfunc=require('../controller/rating');
//rating a user
routers.post('/:id',verifyToken,async(req,res)=>{
    try{
        const user = await RatingModel.findOne({
            ratersID: req.user.id,
            userID: req.params.id
        })
        if(user){
            res.json({message:"already rated"});
        }
        else if(req.user.id!=req.params.id){
                const rating=new RatingModel({
                ratersID:req.user.id,
                userID:req.params.id,
                rating:req.body.rating
        });
            await rating.save();
            res.json({message:"rating added"});
    }
    
    else{
        res.json({message:"cannot rate yourself"});
    }
} 
  
    catch(err){
        res.json({message:err});
    }
}
);

//getting the rating of a user
routers.get('/:id',async(req,res)=>{
    try{ 
        const posts=await RatingModel.aggregate([
                {$group: 
                    {_id: "$userID",
                    rating: {$avg: "$rating"}
                    }
                }]);
        posts.forEach(element => {
            if(element._id==req.params.id){
                res.json(element);
            }
        });
        //res.json(posts);
        console.log(posts);
        
    } catch(err){
        res.json({message:err});
        console.log(err);
    }
}
);


module.exports=routers;
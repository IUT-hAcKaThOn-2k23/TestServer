const express = require('express');
const routers=express.Router();
const PostModel=require('../models/postModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('../controller/verifyToken');
const CommentModel=require('../models/commentModel');

//getting all the blogs of a user
routers.get('/:id',verifyToken,async(req,res)=>{
    try{
        console.log(req.params.id);
        const post=await PostModel.find({userID:req.params.id});
        res.json(post);
    }
    catch(err){
        res.json({message:err});
    }
});

//posting a comment
routers.post('/comment/:id',verifyToken,async(req,res)=>{
    try{
        const comment=new CommentModel({
            userID:req.user.id,
            postID:req.params.id,
            comment:req.body.comment,
            like:0,
            dislike:0,
            reports:0,
            date:new Date()
        });
        await comment.save();
        res.json({message:"comment added"});
    }
    catch(err){
        res.json({message:err});
    }
});

//react to a comment
routers.post('/react/:id',verifyToken,async(req,res)=>{
    try{
        const comment=await CommentModel.findById(req.params.id);
        if(req.body.like){
            comment.like+=1;
        }
        else{
            comment.dislike+=1;
        }
        await comment.save();
        res.json({message:"comment added"});
    }
    catch(err){
        res.json({message:err});
    }
});

module.exports=routers;
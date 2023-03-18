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

//report a comment
routers.post('/report/:id',verifyToken,async(req,res)=>{
    try{
        const comment=await CommentModel.findById(req.params.id);
        comment.reports+=1;
        await comment.save();
        res.json({message:"report added"});
    }
    catch(err){
        res.json({message:err});
    }
});

//deleting a comment
routers.delete('/:id',verifyToken,async(req,res)=>{
    try{
        const comment=await CommentModel.findById(req.params.id);
        if(comment.userID==req.user.id){
            comment.remove();
            res.json({message:"comment deleted"});
        }
        else{
            res.json({message:"comment not found or you are not authorized"});
        }
    }
    catch(err){
        res.json({message:err});
    }
}
);

routers.get('/template', verifyToken, async(req, res)=>{
    const user = req.user
    console.log(decoded)
    res.send(user)
})


module.exports=routers;
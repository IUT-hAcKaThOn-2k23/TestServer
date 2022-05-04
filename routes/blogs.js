const express = require('express');
const routers=express.Router();
const PostModel=require('../models/postModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('../controller/verifyToken');

//posting a blog. This route is protected by verifyToken middleware
routers.post('/',verifyToken,async(req,res)=>{
    //console.log(req.body);
    const post=new PostModel({
        userID:req.body.userID,
        userEmail:req.body.userEmail,
        title:req.body.title,
        tags:req.body.tags,
        content:req.body.content,
        like:0,
        dislike:0
    });
    post.save()
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.json({message: err});
    });
    
});
//getting all the blogs
routers.get('/',async(req,res)=>{
        try{ 
        const posts=await PostModel.aggregate([
                {$sort: {like: -1}},
               {$limit: 10}]);
        res.json(posts);
        
    } catch(err){
        res.json({message:err});
    }
    
});
//updating likes and dislikes on blog
routers.patch('/react/:id',verifyToken,async(req,res)=>{
    try{
        const post=await PostModel.findById(req.params.id);
        if(post){
            if(req.body.like){
                post.like=post.like+1;
            }
            else if(req.body.dislike){
                post.dislike=post.dislike+1;
            }
            post.save();
            res.json(post);
        }
        else{
            res.json({message:"post not found"});
        }
    }
    catch(err){
        res.json({message:err});
    }
});
//getting a blog by id
routers.get('/:id',async(req,res)=>{
    try{
        const post=await PostModel.findById(req.params.id);
        res.json(post);
    }
    catch(err){
        res.json({message:err});
    }
});
//deleting a blog
routers.delete('/:id',verifyToken,async(req,res)=>{
    try{
        const post=await PostModel.findById(req.params.id);
        if(post.userID==req.body.userID){
            post.remove();
            res.json({message:"post deleted"});
        }
        else{
            res.json({message:"post not found"});
        }
    }
    catch(err){
        res.json({message:err});
    }
});
//updating a blog
routers.patch('/:id',verifyToken,async(req,res)=>{
    try{
        const post=await PostModel.findById(req.params.id);
        if(post){
            post.title=req.body.title;
            post.content=req.body.content;
            post.save();
            res.json(post);
        }
        else{
            res.json({message:"post not found"});
        }
    }
    catch(err){
        res.json({message:err});
    }
});
//getting all the blogs of a user
routers.get('/user/:id',verifyToken,async(req,res)=>{
    try{
        const post=await PostModel.find({userID:req.params.id});
        res.json(post);
    }
    catch(err){
        res.json({message:err});
    }
});
//searching a blog by title
routers.get('/search/:title',async(req,res)=>{
    try{
        const post=await PostModel.find({title:req.params.title});
        res.json(post);
    }
    catch(err){
        res.json({message:err});
    }
});
//this search is implemented for the search bar..the api needs to be called
//repeatedly to get character by character results
routers.post('/search',async(req,res)=>{
    //const search=req.body.search;
    console.log(req.body.queryObj);
    let titlePattern = new RegExp("^" + req.body.query) ;
    try{
        const posts=await PostModel.find({name:{$regex: titlePattern, $options: 'i'}})
        .select('title');
        res.json(posts);
    }
    catch(err){
        res.json({message:err});
    }
});

module.exports=routers;
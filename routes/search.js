const express = require('express');
const routers=express.Router();
const PostModel=require('../models/postModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('../controller/verifyToken');
const CommentModel=require('../models/commentModel');

//implementing fuzzy search on blogs
routers.get('/:keyword',async(req,res)=>{
    try{
        const posts=await PostModel.find({title:{$regex:req.params.keyword,$options:'i'}});
        res.json(posts);
    }
    catch(err){
        res.json({message:err});
    }
}
);

//searching blogs by tag
routers.get('/tag/:tag',async(req,res)=>{
    try{
        const posts=await PostModel.find({tags:{$regex:req.params.tag,$options:'i'}});
        res.json(posts);
    }
    catch(err){
        res.json({message:err});
    }
}           
);  

module.exports=routers;

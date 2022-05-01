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
        content:req.body.content
    });
    post.save()
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.json({message: err});
    });
    
});

module.exports=routers;
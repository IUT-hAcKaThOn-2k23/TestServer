const express = require('express');
const routers=express.Router();
const Usermodel=require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//logging in
routers.post('/login',async(req,res)=>{
    try{
        //console.log(req.body);
        const user = await Usermodel.findOne({
            email: req.body.email
        })
        if(user){
            if(bcrypt.compareSync(req.body.password,user.password)){
                const token=jwt.sign({
                    id:user._id,
                    name:user.name,
                    email:user.email
                },process.env.TOKEN);
                res.header('auth-token',token).send(token);
                return res.json({status:'ok' , user:token , role: 'user'});//user is the payload 
            }
            else {
                return res.json({status:'ok' , user: 'error' ,role:'error'}); //staus is ok but user is error means email id matches but not the password
            }
        }
        else {
            return res.json({status:'error' , user:'error'}); //status is error and user is error means email id does not match
        }
    }
    catch(err){

    }
});
//signing up
routers.post('/signUp',async(req,res)=>{
    console.log(req.body);
    const post=new Usermodel({
        name: req.body.name,
        rating: 1,
        email: req.body.mail,
        password: req.body.password,
        about: req.body.about
    });
    Usermodel.findOne({email:req.body.mail})
    .then(data=>{
        if(data){
            res.json({message:"email already exists"});

        }
        else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    res.json({message:err});
                }
                else{
                    post.password=hash;
                }
                post.save()
                .then(data => {
                    res.json(data);
                })
                .catch(err => {
                    res.json({message: err});
                });
            }); 
        }
    });
    // post.save()
    // .then(data => {
    //     res.json(data);
    // })
    // .catch(err => {
    //     res.json({message: err});
    // });
    
});
module.exports=routers;

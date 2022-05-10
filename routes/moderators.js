const express = require('express');
const routers=express.Router();
const PostModel=require('../models/postModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('../controller/verifyToken');
const CommentModel=require('../models/commentModel');
const OTPModel=require('../models/otpCache');

//get OTP for moderator
routers.post('/getOTP',async(req,res)=>{
    try{
            const otp=Math.floor(Math.random()*(9999-1000)+1000);
            const post= new OTPModel({
                otp:otp,
                date:new Date()
            });
            await post.save()
            .then(data => {
                res.json(data.otp);
            })
    }
    catch(err){
        res.json({message:err});
    }
}
);

//verify OTP for moderator
routers.post('/verifyOTP',async(req,res)=>{
    try{
        const otp=await OTPModel.findOne({otp:req.body.otp});
        if(otp){
            if(otp.date.getTime()+8.64e+7>new Date().getTime()){
                res.json({message:"OTP verified"});
                otp.remove(); 
            }
            else{
                res.json({message:"OTP expired"});
            }
        }
        else{
            res.json({message:"OTP not verified"});
        }
    }
    catch(err){
        res.json({message:err});
    }
}
);


module.exports=routers;
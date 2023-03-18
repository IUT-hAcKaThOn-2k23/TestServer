const express = require('express');
const routers=express.Router();
const CvData=require('../models/cvData');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('../controller/verifyToken');
const CommentModel=require('../models/commentModel');
const TemplateModel = require('../models/template')

// post cv data
routers.post('/cvData',verifyToken,async(req,res)=>{

    const cvData=new CvData({
        name: req.body.name,
        label: req.body.label,
        image: req.body.image,
        email: req.body.email,
        phone: req.body.phone,
        url: req.body.url,
        summary: req.body.summary,
        location: {
            address: req.body.location.address,
            postalCode: req.body.location.postalCode,
            city: req.body.location.city,
            countryCode: req.body.location.countryCode,
            region: req.body.location.region
        },
        relExp: req.body.relExp,
        totalExp: req.body.totalExp
    });
    try{
        const savedCvData=await cvData.save();
        res.json(savedCvData);
    }
    catch(err){
        res.json({message:err});
    }
});

// adding CV template
routers.post('/addTemplate',async(req,res)=>{
    const {postImage:image, tags, id} = req.body
    console.log(image, id, tags)
    const template=new TemplateModel({
        templateId: id,
        tag: tags,
        image: image,
        html: req.body.html
    });
    try{
        const savedTemplate=await template.save();
        res.json(savedTemplate);
    }
    catch(err){
        console.log(err)
        res.json({message:err});
    }
})



module.exports=routers;
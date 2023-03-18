const express = require('express');
const routers = express.Router();
const PostModel = require('../models/postModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('../controller/verifyToken');
const CommentModel = require('../models/commentModel');
const OTPModel = require('../models/otpCache');
const ModeratorModel = require('../models/moderatorModel');
const DeleteModel = require('../models/deleteRequest');
const verifyModerator = require('../controller/verifyModerator');
const nodemailer = require('nodemailer');
const Usermodel = require('../models/userModel');
require('dotenv').config();

//get OTP for moderator
routers.post('/getOTP', async (req, res) => {
    const otp = Math.floor(Math.random() * (999999 - 100000) + 100000);
    try {
            const post = new OTPModel({
                otp: otp,
                date: new Date(),
                otpFor: req.body.invitedMail
            });
            console.log(post);
            await post.save()
                .then(data => {
                    res.json(data.otp);
                }).catch(err => {
                    console.log(err);
                });
    }
    catch (err) {
        res.json({ message: err });
    }
    //making a transporter to send otp to moderator
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });
    const mailOptions = {
        from: process.env.EMAIL,
        to: req.body.invitedMail,
        subject: 'OTP for Moderator',
        text: 'Your OTP is ' + otp + " " + "This OTP is valid for 1 day"
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
);

//verify OTP for moderator
routers.post('/verifyOTP', async (req, res) => {
    try {
        const otp = await OTPModel.findOne({ otp: req.body.otp });
        if (otp && otp.otpFor == req.body.email) {
            if (otp.date.getTime() + 8.64e+7 > new Date().getTime()) {
                res.json({ message: "OTP verified" });
                otp.remove();
                const validUser = await Usermodel.updateOne({email: req.body.email}, {$set: {verified: true}}) 
                // const mod = await ModeratorModel.findOne
                //     ({ email: req.mod.email });
                // mod.verified = true;
                // await mod.save();
            }
            else {
                res.json({ message: "OTP expired" });
            }
        }
        else {
            res.json({ message: "OTP not verified" });
        }
    }
    catch (err) {
        console.log(err);
    }
}
);

//login for moderator
//logging in
routers.post('/login', async (req, res) => {
    try {
        //console.log(req.body);
        const user = await ModeratorModel.findOne({
            email: req.body.email
        })
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                const token = jwt.sign({
                    id: user._id,
                    name: user.name,
                    email: user.email
                }, process.env.TOKEN);
                res.header('auth-token', token).send(token);
                return res.json({ status: 'ok', moderator: token, role: 'moderator' });//moderator is the payload 
            }
            else {
                return res.json({ status: 'ok', moderator: 'error', role: 'error' }); //status is ok but moderator is error means email id matches but not the password
            }
        }
        else {
            return res.json({ status: 'error', moderator: 'error' }); //status is error and moderator is error means email id does not match
        }
    }
    catch (err) {

    }
});

//signing up
//signing up
routers.post('/signUp', async (req, res) => {
    // console.log(req.body);
    const post = new ModeratorModel({
        name: req.body.name,
        email: req.body.mail,
        password: req.body.password,
        invitedBy: req.body.invitedBy,
        invitationCount: 3,
        verified: false
    });
    ModeratorModel.findOne({ email: req.body.mail })
        .then(data => {
            if (data) {
                res.json({ message: "email already exists" });
            }
            else {
                ModeratorModel.findOne({ email: req.body.invitedBy })
                    .then(data => {
                        if ((data && data.invitationCount > 0) || req.body.invitedBy == process.env.ADMINPASS) {
                            data.invitationCount--;
                            data.save();
                            bcrypt.hash(req.body.password, 10, (err, hash) => {
                                if (err) {
                                    res.json({ message: err });
                                }
                                else {
                                    post.password = hash;
                                }
                                post.save()
                                    .then(data => {
                                        res.json(data);
                                    })
                                    .catch(err => {
                                        res.json({ message: err });
                                    });
                            });
                        }
                        else {
                            res.json({ message: "invitation email does not exist" });
                        }
                    })
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

//updating post by moderator
routers.post('/updatePost', verifyModerator, async (req, res) => {
    try {
        const post = await PostModel.findOne({ _id: req.body.id });
        const mod = await ModeratorModel.findOne({
            email: req.mod.email
        });
        if (post && mod.verified != false) {
            console.log(req.mod);
            post.content = req.body.content;
            post.tags = req.body.tags;
            post.moderatedBy = req.mod.email;
            post.lastUpdated = new Date();
            post.save()
                .then(data => {
                    res.json(data);
                })
                .catch(err => {
                    res.json({ message: err });
                });
        }
        else {
            res.json({ message: "post not found or moderator not verified" });
        }
    }
    catch (err) {
        res.json({ message: err });
    }
}
);

//deleting post by moderator
routers.post('/deleteReq', verifyModerator, async (req, res) => {
    try {
        const post = await DeleteModel.findOne({ postID: req.body.id });
        if (post.deleteReqCount < 3) {
            post.deleteReqCount++;
            post.modsMails.push(req.mod.email);
            post.save()
                .then(data => {
                    data.msg = "request sent";
                    res.json(data);
                }
                )
                .catch(err => {
                    res.json({ message: err });
                }
                );
        }

        else if (post.deleteReqCount >= 3) {
            const blog = await PostModel.findById(req.body.id);
            if (blog) {
                blog.remove()
                    .then(data => {
                        data.msg = "post deleted";
                        res.json(data);
                    }
                    )
                    .catch(err => {
                        res.json({ message: err });
                    }
                    );
            }
            else {
                res.json({ message: "post already deleted" });
            }

        }
        else {
            const post2 = new DeleteModel({
                postID: req.body.id,
                deleteReqCount: 1,
                modsMails: [req.mod.email]
            });
            post2.save()
                .then(data => {
                    res.json(data);
                })
                .catch(err => {
                    res.json({ message: err });
                });

        }
    }
    catch (err) {
        res.json({ message: err });
    }
}
);


module.exports = routers;
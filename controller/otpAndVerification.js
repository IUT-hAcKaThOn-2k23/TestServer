

// otp verification function
const otpGeneration = async (req, res) => {
    const otp = Math.floor(Math.random() * (9999 - 1000) + 1000);
    try {
        if (req.mod.verified == null || req.mod.verified == true) {
            const post = new OTPModel({
                otp: otp,
                date: new Date(),
                otpFor: req.body.invitedMail  
            });
            await post.save()
                .then(data => {
                    res.json(data.otp);
                })
        }
        else {
            res.json("not a verified moderator itself");
        }
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
};

module.exports = otpGeneration;
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
//const fileUpload = require('express-fileupload');
//middlewares
app.use(cors());
app.use(express.json());

mongoose.set('strictQuery', true);

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

//authentication module
const authRoutes = require('./routes/auth');
app.use('/auth',authRoutes);

//the blog posting module
const blogPostingRoutes = require('./routes/blogs');
app.use('/blog',blogPostingRoutes);

//the user valued functions
const userFunc = require('./routes/userFunctions');
app.use('/user',userFunc);

//rating of an user
const ratingFunc = require('./routes/ratingFunc');
app.use('/rating',ratingFunc);

//searchings
const searchFunc = require('./routes/search');
app.use('/search',searchFunc);

//moderators functions
const moderatorFunc = require('./routes/moderators');
app.use('/moderator',moderatorFunc);

//template functions
const templateFunc = require('./routes/template');
app.use('/template',templateFunc);

//connect to the db 
// mongoose.connect(process.env.DB_CONNECTION,
// {   useNewUrlParser: true,
//     serverSelectionTimeoutMS: 300000
// },
// function (err, res) {
//     try {
//         console.log('Connected to Database');
//     } catch (err) {
//         throw err;
//     }
// })

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}

mongoose.connect('mongodb://salmanjensen:sal@ac-36yxasj-shard-00-00.yx3sl49.mongodb.net:27017,ac-36yxasj-shard-00-01.yx3sl49.mongodb.net:27017,ac-36yxasj-shard-00-02.yx3sl49.mongodb.net:27017/?ssl=true&replicaSet=atlas-11gshm-shard-0&authSource=admin&retryWrites=true&w=majority',
    connectionParams,
)
.then(()=>console.log('connected'))
.catch(e=>console.log(e));

//how do we start listening to the server
app.listen(5001);
// create a get route to welcome
app.get('/',(req,res)=>{
    res.send('we are on home');
    res.status(200);
});
console.log('listening on port 5001');
module.exports=app;
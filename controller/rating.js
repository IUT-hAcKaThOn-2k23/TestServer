const RatingModel=require('../models/ratingModel');
const UserModel=require('../models/userModel');
module.exports = async function ratingSystem(req, res, next){
    try{ 
        const posts=await RatingModel.aggregate([
                {$group: 
                    {_id: "$userID",
                    rating: {$avg: "$rating"}
                    }
                }]);
        res.json(posts);
        console.log(posts);
        next();
        
    } catch(err){
        res.json({message:err});
        console.log(err);
    }
}
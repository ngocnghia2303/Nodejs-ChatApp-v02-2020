const jwt = require('jsonwebtoken');

const checkToken = function(req, res, next){
    //find token by send req to header 
    const token = req.header('authenticate-token');
    if(!token){
        return res.status(401).send("Sign up to login App Chat Linda!!!");
    }else{
        // const verifyToken = jwt.verify(token, process.env.SECRET_TOKEN, function(err, decoded){
        //     if(err){
        //         throw err
        //     }else{
         // }
        // })
        try {
            const verifyToken = jwt.verify(token, process.env.SECRET_TOKEN);
            req.user = verifyToken;
            next();
        }catch(err){
            res.status(400).send("Token not true!!!");
        };
    };
};

module.exports = checkToken;
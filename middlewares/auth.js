import jwt from "jsonwebtoken";

export const authmiddleware = (req, res, next) => {
    const token = req.headers["x-auth-token"];
    if(!token){
        return res.status(401).send({
            success: false,
            message: "No token provided"
        });
    }
    
    try{
        const {data} = jwt.verify(token, 'secret');
        if(!data) return res.status(401).send({
            success: false,
            message: "Invalid token"
        });
        req.body.email = data.email;
        req.body.role = "the given role"
        next(); 
    }catch(err){
        res.status(400).send({
            success: false,
            message: err.message,

        });
    }
}
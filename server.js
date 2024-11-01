import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import { authmiddleware } from "./middlewares/auth.js";
import { MongoDB } from "./configs/DBconnection.js";
import User from "./models/user.js";
import Resturant from "./models/resturant.js";
import resturantData from "./data/resturant.js";
import { comparePassword, hashPassword } from "./configs/hashPassword.js";
import jwt from "jsonwebtoken";
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors(
  {
    origin: "*",
  }
));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  return res.status(200).send("Hello World");
});


app.get("/resturant", async (req, res) => {
  try {
    const resturants = await Resturant.find();
    res.status(200).send({
      success: true,
      message: "Resturants fetched successfully",
      data: resturants,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({
      success: false, 
      message: err.message,
    });
  }
});

app.post("/user/register", async (req, res) => {
  try {
    console.log(req.body);
    const user = {...req.body, name: req.body.name.toLowerCase().replace(/\s+/g, '') };
    if(req.body.password) user.password = await hashPassword(req.body.password);
    if(req.body.provider) user.provider = req.body.provider;
    if(req.body.verified) user.verified = req.body.verified;
    if(await User.findOne({email: user.email})) return res.status(409).send({success: false, message: "User already exists"});
    const newUser = new User(user);
    const token = jwt.sign({data:newUser}, 'secret',{expiresIn: '1h'});
    const {password, ...others} = newUser.toObject();
    await newUser.save();
    res.status(201).send({
      success: true,
      message: "User created successfully",
      token: token,
      data: others,});
  } catch (err) {
    console.log(err.message);
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
});

app.post("/user/login", async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findOne({email: req.body.email}).select("-__v -createdAt -updatedAt ");
    if(!user) return res.status(404).send({ success: false, message: "User not found"});

    const token = jwt.sign({data:user}, 'secret',{expiresIn: '1h'});
    console.log(user);
    if(req.body.provider.toString() === "google") return res.status(200).send({success: true, message: "Login successful", token, data: user});
    if(user.password === null) return res.status(401).send({success: false, message: "Invalid credentials"});
    
    if(!await comparePassword(req.body.password, user.password)) return res.status(401).send({success: false, message: "Invalid credentials"});
    const {password, ...others} = user.toObject();
    res.status(200).send({
      success: true,
      message: "Login successful",
      token,
      data: others});
   
  } catch (err) {
    console.log(err.message);
    res.status(500).send({
      success: false,
      message: err.message,

    });
  }
});
app.get("/user", authmiddleware, async (req, res) => {
  try {
    
    
    return res.status(200).send({success: true, data: req.body});
  } catch (err) {
    console.log(err.message);
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  MongoDB();
});


if(false){
  try {
    const result = await Resturant.insertMany(resturantData);
    console.log('All restaurant data inserted successfully');
  } catch (err) {
    console.error(err);
  }
    
}
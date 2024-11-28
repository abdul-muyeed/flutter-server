import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import { authmiddleware } from "./middlewares/auth.js";
import { MongoDB } from "./configs/DBconnection.js";
import {User} from "./models/user.js";
import { Resturant } from "./models/resturant.js";
import resturantData from "./data/resturant.js";
import orderData from "./data/order.js";
import { comparePassword, hashPassword } from "./configs/hashPassword.js";
import jwt from "jsonwebtoken";
import { Order } from "./models/order.js";
import { Favorite } from "./models/favorite.js";
import { Review } from "./models/review.js";
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
app.get("/resturant/:id", async (req, res) => {
  try {
    const resturant = await Resturant.findById(req.params.id);
    res.status(200).send({
      success: true,
      message: "Resturant fetched successfully",
      data: resturant,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
})


app.post("/user/register", async (req, res) => {
  try {
    console.log(req.body);
    const user = req.body;
    user.name = user.name.toLowerCase();
    const newUser = new User(user);
    await newUser.save();
    res.status(201).send({
      success: true,
      message: "User created successfully",
      data: newUser,});
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

    const token = jwt.sign({data:user}, 'secret',{expiresIn: '24h'});
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
app.get("/user", async (req, res) => {
  try {
    const user = await User.findOne({email: req.body.email}).select("-__v -createdAt -updatedAt ");
    if(!user) return res.status(404).send({ success: false, message: "User not found"});

    res.status(200).send({
      success: true,
      message: "User fetched successfully",
      data: user
    });


    
   
  } catch (err) {
    console.log(err.message);
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
});
app.put("/user/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).send({
      success: true,
      message: "User updated successfully",
      data: user
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({
      success: false,
      message: err.message
    });
  }
})

app.post("/resturant", async (req, res) => {
  try {
    const resturant = new Resturant(req.body);
    const user = await User.findById(req.body.ownerId);
    user.ownerId = resturant._id;
    user.role = "owner";

    await resturant.save();
    await user.save();
    res.status(201).send({
      success: true,
      message: "Resturant created successfully",
      data: resturant
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({
      success: false,
      message: err.message
    });
  }

})

app.get('/orders',async (req, res) => {
  try {
    console.log(req.body);
    const orders = await Order.find(req.body);
    console.log(orders);
    res.status(200).send({
      success: true,
      message: "Orders fetched successfully",
      data: orders
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({
      success: false,
      message: err.message
    });
  }
})

app.post('/order', async (req, res) => {
  try {
    console.log(req.body);
    const order = new Order(req.body);
    
    const user =  await User.findById(req.body.customerId);
    user.balance -= (req.body.price*req.body.quantity);
    const resturant = await Resturant.findById(req.body.ownerId);

    resturant.seats[req.body.day][req.body.meal].bookings += req.body.quantity;
    resturant.balance += (req.body.price*req.body.quantity);

    await user.save();
     await order.save();
    await resturant.save();
    res.status(201).send({
      success: true,
      message: "Order created successfully",
      data: order
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({
      success: false,
      message: err.message
    });
  }
})
app.put('/order/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).send({
      success: true,
      message: "Order updated successfully",
      data: order
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({
      success: false,
      message: err.message
    });
  }
})
app.post('/review', async (req, res) => {
  try {
    console.log(req.body);
    const review = new Review(req.body);
    
    await review.save();
    res.status(201).send({
      success: true,
      message: "Review created successfully",
      data: review
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({
      success: false,
      message: err.message
    });
  }

});
app.get('/review', async (req, res) => {
  try {
    console.log(req.body);
    const reviews = await Review.find(req.body);
    console.log(reviews);
    res.status(200).send({
      success: true,
      message: "Reviews fetched successfully",
      data: reviews
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({
      success: false,
      message: err.message
    });
  }
});
app.put('/review/:id', async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).send({
      success: true,
      message: "Review updated successfully",
      data: review
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({
      success: false,
      message: err.message
    });
  }
  
})
app.put('/order/reject/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, {status: "Rejected"}, {new: true});
    const resturant = await Resturant.findById(order.ownerId);
    resturant.seats[order.day][order.meal].bookings -= order.quantity;
    resturant.balance -= order.price;
    const user = await User.findById(order.customerId);
    user.balance += order.price;
    await user.save();
    await resturant.save();
    res.status(200).send({
      success: true,
      message: "Order rejected successfully",
      data: order
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({
      success: false,
      message: err.message
    });
  }
});
app.get('/resturant/status/:id', async (req, res) => {
  try {
    const resturant = await Resturant.findById(req.params.id);
    let seats = resturant.seats[req.body.day][req.body.meal].total - resturant.seats[req.body.day][req.body.meal].bookings;
    if (seats <= 0) seats = 0;

    res.status(200).send({
      success: true,
      message: "Resturant status fetched successfully",
      data: seats
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({
      success: false,
      message: err.message
    });
  }
});

app.post('/favorite', authmiddleware, async (req, res) => {
  try {
    console.log(req.body);
    const user = await Favorite.findOne({email: req.body.email});
    if(!user){
      const favorite = new  Favorite({email: req.body.email, favorites: [req.body.resturantId]});
      await favorite.save();
      return res.status(201).send({
        success: true,
        message: "Favorite added successfully",
        data: favorite
      });
    }else{
      user.favorites.push(req.body.resturantId);
      await user.save();
      return res.status(200).send({
        success: true,
        message: "Favorite added successfully",
        data: user
      });
    }
    
  } catch (err) {
      console.log(err.message);
    }
})

app.put('/resturant/:id', async (req, res) => {
  try {
    const user = await Resturant.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).send({
      success: true,
      message: "Resturant updated successfully",
      data: user
    });

  } catch (err) {
    console.log(err.message);
    res.status(500).send({
      success: false,
      message: err.message
    });
  }
}
)




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
if(false){
  try {
    const result = await Order.insertMany(orderData);
    console.log('All user data inserted successfully');
  } catch (err) {
    console.error(err);
  }
    
}
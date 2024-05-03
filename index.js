const express = require('express');
const app = express();
const cors = require('cors');
const mongodbfile = require('./mongo');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
const stripe = require('stripe')('sk_test_51P3tnISE4nUJnYc35dt1eGpmdlqRsU9Z8PbZHluquU3RfqSjvlsx7pAhSlF0b8O2wizR5YJEJw5IB19dNSpFkrZM00NbzrZ3Rb')
app.get('/',cors(), (req , res)=>{
    res.send('payment')
})
app.post('/api/create-checkout-session', async (req , res) =>{
 const {products} = req.body;
 const particularitem = products.map((ddd)=>({
    price_data:{
        currency:"inr",
        product_data:{
            name:ddd.name , 
        },
        unit_amount:ddd.price * 100 , 
    },
    quantity:ddd.count
 }))
 const session = await stripe.checkout.sessions.create({

    line_items: particularitem,
    mode: 'payment',
    payment_method_types:["card"],
    success_url: 'https://example.com/success',
    cancel_url: 'https://example.com/cancel'
  });

  res.json({id:session.id})
})

// the login and signin code //
 
app.get('/' , cors() , (req,res)=>{
    res.send("welcome to login sign up method")
})

// app.post("/signin" , async(req,res)=>{
//     const {email , password} = req.body
//     const savingformat ={
//         email:email , 
//         password:password
//     }
//     const checking = await mongodbfile.findOne({email})
//     if (checking) {
//         res.json("exist")
//     } else {
//         res.json("not exist")
//         await mongodbfile.insertMany([savingformat])
//     }
// })

app.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    const savingformat = {
        email: email,
        password: password
    }
    const checking = await mongodbfile.findOne({ email, password })
    if (checking) {
        res.json("exist")
    } else {
        res.json("not exist")
        await mongodbfile.create(savingformat) 
    }
})

app.post("/login" , async(req,res)=>{
    const {email , password} = req.body
    const checking = await mongodbfile.findOne({email,password})
    if (checking) {
        res.json("exist")
    } else {
        res.json("not exist")
    }
})

// end of signin/login code

app.listen(3200 , ()=>{
    console.log("port connected");
})
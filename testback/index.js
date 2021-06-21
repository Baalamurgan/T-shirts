import express from 'express';
const app = express();
const port=8000;
const name="Baala";
app.get("/",(req,res)=>{
    return res.send(`<h1>Hello there! ${name}</h1>`);
})
app.get("/login",(req,res)=>{
    return res.send("Welcome to LOGIN");
})

const admin = (req,res)=>{
    return res.send("This is ADMIN dashboard");
};

const isAdmin=(req,res,next)=>{
    console.log("isAdmin is running");
    next();
};

const isloggedIn=(req,res,next)=>{
    next();
};

app.get("/admin",isloggedIn,isAdmin,admin);

app.listen(port,()=>{
    console.log("Server is ALL THE WAY UP!")
})
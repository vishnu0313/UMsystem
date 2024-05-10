const User = require('../models/userModel');
const bcrypt = require('bcrypt')

const securePassword = async (password) => {
    try {
        const passwordHash = await bcrypt.hash(password,10); 
        return passwordHash;
    } catch (error) {
        console.log(error.message);
    }
} 

const loadRegister = async(req,res) => {
    try {
        
        res.render('registration');
    } catch (error) {
        console.log(error.message);
        
    }
} 

const insertUser = async(req,res)=> {
    try {
        const spassword = await securePassword(req.body.password);
        const user = new User({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phno,
            password:spassword,
            is_admin:0
        });
        const userData = await user.save();
        
        if (userData) {
            res.render('registration',{message:"Youre registration has been compleated successfully"});
        }else{
            res.render('registration',{message:"Youre registration failed"});
        }

    } catch (error) {
        console.log(error.message);
    }
}

const loginLoad = async(req,res)=> {
    try {
        res.render('login');
    } catch (error) {
        console.log(error.message);
    }
}

const verifyLogin = async(req,res)=> {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const userdata = await User.findOne({email:email});

        if (userdata) {
            const passwordMatch = await bcrypt.compare(password,userdata.password);
            if (passwordMatch) {
                res.redirect('/home');
            } else {
                res.render('login',{message:"Email and password are incorrect"});
            }
        }else{
            res.render('login',{message:"Email and password are incorrect"});
        }
    } catch (error) {
        console.log(error.message);
    }
}

const loadHome = async(req,res) => {
    try {
        res.render('home');
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    loadRegister,
    insertUser,
    loginLoad,
    verifyLogin,
    loadHome
}
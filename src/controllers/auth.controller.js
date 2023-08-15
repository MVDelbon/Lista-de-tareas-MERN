import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";


export const register = async (req, res) => {
  try {    
    const  {email, password, userName} = req.body;
    const userFound = await User.findOne ({email});
    if (userFound)
        return res.status(400).json(["The email is already in use"]);


   const passwordHash = await bcrypt.hash(password, 10)
    
    const newUser = new User ({
    userName,
    email,
    password: passwordHash,
})

const userSaved=  await newUser.save();
const token = await createAccessToken({id: userSaved._id})

res.cookie("token", token, {
    httpOnly: process.env.NODE_ENV !== "development",
    secure: true,
    sameSite: "none",
  });

res.json ({
    id: userSaved._id,
    userName: userSaved.userName,
    email:userSaved.email,
  });

} catch (error){
    res.status(500).json({message:error.message});
}

}

export const login = async (req, res) => {
   try {    
    const  {email, password} = req.body;
    const userFound = await User.findOne({email});

    if (!userFound) return res.status(400).json({message : ["User not found"]});

    const isMatch = await bcrypt.compare(password, userFound.password);
     if (!isMatch) return res.status(400).json({message: ["Incorrect password"]});


const token = await createAccessToken({
    id: userFound._id,
    username: userFound.username,
});

res.cookie("token", token, {
    httpOnly: process.env.NODE_ENV !== "development",
    secure: true,
    sameSite: "none",
  });

res.json ({
    id: userFound._id,
    userName: userFound.userName,
    email:userFound.email,
  });

} catch (error){
    res.status(500).json({message:error.message});
}

};

export const logout = (req, res) =>{
    res.cookie("token", "", {
        httpOnly: true,
        secure: true,
        expires: new Date(0),
      });
      return res.sendStatus(200);
    };

export const profile = async (req, res) =>{
   const userFound = await User.findById(req.user.id)

   if(!userFound) return res.status(400).json({message:"User not found"});
   
   return res.json({
    id: userFound._id,
    username: userFound.userName,
    email: userFound.email,
    
   })
    res.send('profile')
}

export const verifyToken = async (req, res) => {
    const {token} = req.cookies
    if (!token) return res.send(false);

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401);

        const userFound = await User.findById (user.id)
        if (!userFound) return res.status (401);
   
        return res.json ({
            id: userFound._id,
            userName: userFound.userName,
            email: userFound.email,
        })
    })
} 
import {db} from "../connect.js"
import bcrypt from "bcryptjs"

export const login= (req,res,next)=>{
    res.send("LOGIN")
}

export const logout= (req,res,next)=>{
    res.send("LOGOUT")
}

export const register= (req,res,next)=>{
    // const q = `SELECT * FROM users WHERE username = ${req.body.username}`  THIS IS VULNERABLE TO SQL INJECTIONS

    const q = "SELECT * FROM users WHERE username = ?"
    db.query(q,[req.body.username],(err,data)=>{
        if(err){
            return res.status(500).json(err)
        }
        if (data.length) {
            return res.status(409).json("USER EXISTS")
        }

        const salt = bcrypt.genSaltSync(10)
        const hashPswrd = bcrypt.hashSync(req.body.password, salt)

        const q = "INSERT INTO users(username , email , password, name) VALUES (?, ?, ?, ?)"

        db.query(q,[req.body.username, req.body.email, hashPswrd, req.body.name],(err,data)=>{
            if(err){
                return res.status(500).json(err)
            }
            return res.status(200).json("USER CREATED")
        })
    })
}
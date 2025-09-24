import express from "express"
import dotenv from "dotenv"

import userRouter from "./routes/users.js"
import authRouter from "./routes/auth.js"
import commentsRouter from "./routes/comments.js"
import likesRouter from "./routes/likes.js"
import postsRouter from "./routes/posts.js"

dotenv.config()
const app = express()

app.use(express.json());
app.use("/api/auth",authRouter)
app.use("/api/users",userRouter)
app.use("/api/comments",commentsRouter)
app.use("/api/likes",likesRouter)
app.use("/api/posts",postsRouter)
console.log(process.env.PORT)

app.listen(process.env.PORT,()=>console.log("SERVER STARTED"))
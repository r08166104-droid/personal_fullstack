import express from "express";
import dotenv from "dotenv";

import userRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";
import commentsRouter from "./routes/comments.js";
import likesRouter from "./routes/likes.js";
import postsRouter from "./routes/posts.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/likes", likesRouter);
app.use("/api/posts", postsRouter);

app.listen(process.env.PORT, () => console.log("SERVER STARTED"));

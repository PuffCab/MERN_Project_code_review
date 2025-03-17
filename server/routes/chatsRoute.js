import express from "express";
import {
  createNewChat,
  getAllChats,
  getChats,
} from "../controller/chatsController.js";
import jwtAuth from "../middlewares/jwtAuth.js";

const chatsRouter = express.Router();

chatsRouter.get("/all", getAllChats);
chatsRouter.get("/userChats", getChats);

chatsRouter.post("/newChat", jwtAuth, createNewChat);

export default chatsRouter;

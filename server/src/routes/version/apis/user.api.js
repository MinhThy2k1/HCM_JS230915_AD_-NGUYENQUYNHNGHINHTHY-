import userController from "../../../controller/user.controller";
import express from "express";
const Router = express.Router();
Router.post("", userController.register)
Router.get("",userController.getAllUser)
Router.get("/:id",userController.getUserById)
Router.put("/:id",userController.updateUserById)
Router.delete("/:id",userController.deleteUserById)

export default Router
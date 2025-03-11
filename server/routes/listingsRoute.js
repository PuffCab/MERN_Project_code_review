import express from "express";
import {
  addNewListing,
  getAllListings,
  getListingsByCategory,
} from "../controller/listingsController.js";
import multerUpload from "../middlewares/multer.js";
import jwtAuth from "../middlewares/jwtAuth.js";

const listingsRouter = express.Router();

listingsRouter.get("/all", getAllListings);
listingsRouter.get("/all/categories/:category", getListingsByCategory);
listingsRouter.post(
  "/newlisting",
  jwtAuth,
  multerUpload.single("image"),
  addNewListing
);

export default listingsRouter;

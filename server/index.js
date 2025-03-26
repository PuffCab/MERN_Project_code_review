// import express from "express";
// import colors from "colors";
// import { createServer } from "node:http";
// import { Server } from "socket.io";

// import cors from "cors";
// import morgan from "morgan";
// import mongoose from "mongoose";

// import * as dotenv from "dotenv";
// dotenv.config(); // this initialise the dotenv package

// import usersRouter from "./routes/usersRoutes.js";
// import listingsRouter from "./routes/listingsRoute.js";
// import cloudinaryConfig from "./config/cloudinaryConfig.js";

// import passport from "passport";
// import passportStrategy from "./config/passportConfig.js";
// import chatsRouter from "./routes/chatsRoute.js";

// const app = express();

// const port = process.env.PORT || 4000; // until deployment the value will be 4000

// const addMiddlewares = () => {
//   app.use(express.json());
//   app.use(
//     express.urlencoded({
//       extended: true,
//     })
//   );
//   app.use(cors());
//   // app.use(morgan("dev"));
//   cloudinaryConfig();

//   passport.initialize();
//   passport.use(passportStrategy);
// };

// // const startServer = () => {
// //   // this to initiate server as a simple express application
// //   app.listen(port, () => {
// //     console.log(`Server is running on ${port} port`.bgGreen);
// //   });

// //   // this to initiate server as an http server
// //   // server.listen(port, () => {
// //   //   console.log(`Server is running on ${port} port`.bgGreen);
// //   // });
// // };

// const loadRoutes = () => {
//   app.use("/api/listings", listingsRouter); // we define endpoint of the listingsRouter - if after that comes a "/all", we'll trigger the getAllListings function
//   app.use("/api/users", usersRouter);
//   app.use("/api/chats", chatsRouter);
// };

// const DBConnection = async () => {
//   try {
//     const mongoDBConnection = await mongoose.connect(process.env.MONGODB_URL); // env variable to connect with our mongo server

//     if (mongoDBConnection) {
//       console.log("Connected with MongoDB".bgGreen);
//     }
//   } catch (error) {
//     console.log("error connecting with MongoDB :>> ".bgRedred, error);
//   }
// };

// // const passcode = generator.generate({
// //   length: 15,
// //   numbers: true
// // });

// // console.log(passcode);

// // IIFE (Immediately Invoked Function Expressions) - not creating a specific function for this so everytime it restarts it doesn't generate a new instance

// (async function () {
//   await DBConnection();
//   addMiddlewares();
//   loadRoutes();
// })();

// export default app;

import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

import usersRouter from "./routes/usersRoutes.js";
import listingsRouter from "./routes/listingsRoute.js";
import cloudinaryConfig from "./config/cloudinaryConfig.js";
import passport from "passport";
import passportStrategy from "./config/passportConfig.js";
import chatsRouter from "./routes/chatsRoute.js";

const app = express();

const port = process.env.PORT || 4000;

const addMiddlewares = () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  cloudinaryConfig();

  passport.initialize();
  passport.use(passportStrategy);
};

const loadRoutes = () => {
  app.use("/api/listings", listingsRouter);
  app.use("/api/users", usersRouter);
  app.use("/api/chats", chatsRouter);
};

const DBConnection = async () => {
  try {
    const mongoDBConnection = await mongoose.connect(process.env.MONGODB_URL);

    if (mongoDBConnection) {
      console.log("Connected with MongoDB");
    }
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
};

(async function () {
  await DBConnection();
  addMiddlewares();
  loadRoutes();
})();

export default app; // Ensure this export is here for Vercel to use the serverless function

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import {
  clientRoutes,
  generalRoutes,
  managementRoutes,
  salesRoutes,
} from "./routes";
import { env } from "./utils/env";

/* CONFIG */
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // to allow us to make cros origin sharing request (API call from another server)
app.use(morgan("common")); // logging
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

/* MONGOOSE SETUP & RUN THE APP */
const PORT = env.PORT || 9000;
mongoose
  .connect(env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running at port: ${PORT}`));
  })
  .catch((error) => {
    console.log(`${error} did not connect`);
  });

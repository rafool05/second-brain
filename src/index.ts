import express from "express";
import mongoose from "mongoose";
import JWT from "jsonwebtoken";

import {router as apiCall} from "./routes/apiCall"
const app = express();
app.use("api/v1",apiCall)
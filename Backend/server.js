import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser";
import connectDB from "./utils/db.js";
import authRoute from "./routes/authRoute.js"
import adminRoute from "./routes/adminRoute.js"
import studentRoute from "./routes/studentRoute.js"
dotenv.config({});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
}
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

//api's
app.use("/api/v1/user", authRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/students", studentRoute);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port ${PORT}`);
});
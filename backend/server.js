import express from "express";  
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import cors from 'cors';
import router from "./routes.js";
import path from "path";

const __dirname = path.resolve();
dotenv.config();
const app = express();
app.use(cors({ origin: 'https://storefrontng.onrender.com' }));
app.use(express.json());
app.use("/api/products", router);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/build")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
    });
}

const PORT = process.env.PORT || 5000;  
app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server Started at ${PORT}`);
});

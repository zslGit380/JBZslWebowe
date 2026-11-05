import express from "express";
import { ksiazki } from "./dane.js";

const app = express();

app.get("/ksiazki", (req, res) => {
    res.json(ksiazki);
});

app.listen(3000, () => {
    console.log("Serwer działa: http://localhost:3000");
});
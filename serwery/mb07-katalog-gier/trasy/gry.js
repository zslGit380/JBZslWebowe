import { Router } from "express";
import { gry } from "../dane.js";

const router = Router();

router.get("/", (req, res) => {
  res.json(gry);
});

router.get("/:id", (req, res) => {
  const gra = gry.find((g) => g.id === Number(req.params.id));
  if (!gra) {
    res.status(404).json({ blad: "Nie ma gry o takim numerze" });
    return;
  }
  res.json(gra);
});

export default router;
import express from "express";
import { gry } from "./dane.js";

const app = express();

const logger = (req, res, next) => {
  req.czasZadania = new Date().toLocaleTimeString("pl-PL");
  console.log(`[${req.czasZadania}] ${req.method} ${req.url}`);
  next();
};

app.use(logger);

app.get("/", (req, res) => {
  res.send(`
    <h1>Katalog gier planszowych</h1>
    <ul>
      <li><a href="/gry">/gry</a> - wszystkie gry</li>
      <li><a href="/szukaj?max=150">/szukaj</a> - wyszukiwanie</li>
      <li><a href="/gry/1">/gry/:id</a> - jedna gra</li>
      <li><a href="/statystyki">/statystyki</a> - podsumowanie</li>
    </ul>
  `);
});

app.get("/gry", (req, res) => {
  res.json(gry);
});

app.get("/gry/:id", (req, res) => {
  const szukane = Number(req.params.id);
  const gra = gry.find((g) => g.id === szukane);

  if (!gra) {
    res.status(404).json({ blad: "Nie ma gry o takim numerze" });
    return;
  }

  res.json(gra);
});

app.get("/szukaj", (req, res) => {
  const { wydawca, max, gracze } = req.query;
  let wynik = gry;

  if (wydawca) {
    wynik = wynik.filter((g) => g.wydawca.toLowerCase() === wydawca.toLowerCase());
  }
  
  if (max) {
    wynik = wynik.filter((g) => g.cena <= Number(max));
  }
  
  if (gracze) {
    wynik = wynik.filter((g) => g.gracze >= Number(gracze));
  }

  res.json(wynik);
});

app.get("/statystyki", (req, res) => {
  const liczbaGier = gry.length;
  
  const sumaCen = gry.reduce((suma, g) => suma + g.cena, 0);
  const srednia = sumaCen / liczbaGier;
  const sredniaCena = Math.round(srednia * 100) / 100;

  const najdrozszaGra = gry.reduce((najdrozsza, g) => {
    return g.cena > najdrozsza.cena ? g : najdrozsza;
  }, gry[0]);

  res.json({
    liczbaGier: liczbaGier,
    sredniaCena: sredniaCena,
    najdrozsza: najdrozszaGra.nazwa
  });
});

app.listen(3000, () => {
  console.log("Serwer działa: http://localhost:3000");
});
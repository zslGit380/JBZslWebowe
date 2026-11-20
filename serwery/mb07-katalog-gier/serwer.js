import express from "express";
import { gry } from "./dane.js";
import routerGier from "./trasy/gry.js";

const app = express();

const logger = (req, res, next) => {
  req.czasZadania = new Date().toLocaleTimeString("pl-PL");
  console.log(`[${req.czasZadania}] ${req.method} ${req.url}`);
  next();
};

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.use("/gry", routerGier);

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

app.use((req, res) => {
  if (req.url.startsWith("/gry") || req.url.startsWith("/szukaj")) {
    res.status(404).json({ blad: "Nie ma takiej trasy" });
    return;
  }
  res.status(404).send("<h1>404 - nie ma takiej strony</h1>");
});

app.use((err, req, res, next) => {
  console.error("Błąd:", err.message);
  res.status(500).json({ blad: "Błąd serwera" });
});

app.listen(3000, () => {
  console.log("Serwer działa: http://localhost:3000");
});
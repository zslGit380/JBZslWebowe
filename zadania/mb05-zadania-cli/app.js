import { wczytaj, zapisz } from "./magazyn.js";

const [,, komenda, argument] = process.argv;

const zadania = await wczytaj();

switch (komenda) {
  case "lista":
    if (zadania.length === 0) {
      console.log("Brak zadań.");
    } else {
      zadania.forEach((zadanie, i) => {
        const status = zadanie.zrobione ? "[x]" : "[ ]";
        console.log(`${i + 1}. ${status} ${zadanie.tekst}`);
      });
    }
    break;

  case "dodaj":
    if (!argument) {
      console.log("Błąd: Podaj tekst zadania.");
      process.exit(1);
    }
    const nowe = [...zadania, { tekst: argument, zrobione: false }];
    await zapisz(nowe);
    console.log("Dodano zadanie.");
    break;

  default:
    console.log("Nieznana komenda.");
}
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

  case "zrobione":
    const numer = Number(argument);
    if (isNaN(numer) || numer < 1 || numer > zadania.length) {
      console.log("Błąd: Podaj prawidłowy numer zadania.");
      process.exit(1);
    }
    const zaktualizowane = zadania.map((zadanie, i) => 
      i === numer - 1 ? { ...zadanie, zrobione: true } : zadanie
    );
    await zapisz(zaktualizowane);
    console.log("Zadanie oznaczone jako zrobione.");
    break;

  default:
    console.log("Nieznana komenda.");
}
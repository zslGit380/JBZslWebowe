import fs from "node:fs/promises";
import path from "node:path";

const PLIK = path.join(import.meta.dirname, "zadania.json");

/**
 * Wczytuje listę zadań z pliku.
 *
 * @returns {Promise<Array<{tekst: string, zrobione: boolean}>>}
 * lista zadań; pusta, gdy plik jeszcze nie istnieje
 * @throws {Error} gdy plik istnieje, ale jest uszkodzony
 */
export const wczytaj = async () => {
  try {
    const tekst = await fs.readFile(PLIK, "utf-8");
    return JSON.parse(tekst);
  } catch (blad) {
    if (blad.code === "ENOENT") {
      return [];
    }
    throw blad;
  }
};

/**
 * Zapisuje dane do pliku w formacie JSON, czytelnie sformatowane.
 *
 * @param {Array<{tekst: string, zrobione: boolean}>} zadania tablica obiektów do zapisania
 * @returns {Promise<void>} nic nie zwraca
 * kończy się po zapisaniu pliku
 */
export const zapisz = async (zadania) => {
  await fs.writeFile(PLIK, JSON.stringify(zadania, null, 2), "utf-8");
};
const umiejetnosci = [
  { nazwa: "HTML", poziom: 4, kategoria: "frontend" },
  { nazwa: "CSS", poziom: 3, kategoria: "frontend" },
  { nazwa: "JavaScript", poziom: 3, kategoria: "frontend" },
  { nazwa: "SQL", poziom: 2, kategoria: "backend" }
];

const lista = document.querySelector("#lista-umiejetnosci");

for (const umiejetnosc of umiejetnosci) {
  const li = document.createElement("li");
  li.textContent = umiejetnosc.nazwa;
  lista.appendChild(li);
}

const formularz = document.querySelector("form");
const komunikat = document.querySelector("#komunikat");

formularz.addEventListener("submit", (event) => {
  event.preventDefault();

  const imie = document.querySelector("#imie").value;
  const email = document.querySelector("#email").value;
  const temat = document.querySelector("#temat").value;
  const wiadomosc = document.querySelector("#wiadomosc").value;

  if (imie === "" || email === "") {
    komunikat.textContent = "Błąd: imię i e-mail są wymagane.";
    komunikat.style.color = "red";
    return;
  }

  komunikat.textContent = `Dziękuję, ${imie}! Otrzymaliśmy wiadomość na temat: ${temat}.`;
  komunikat.style.color = "green";

  formularz.reset();
});

let licznik = 0;

const przycisk = document.querySelector("#przycisk");
const wynik = document.querySelector("#wynik");

przycisk.addEventListener("click", () => {
  licznik++;
  wynik.textContent = `Liczba kliknięć: ${licznik}`;
});

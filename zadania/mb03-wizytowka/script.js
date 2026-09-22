const umiejetnosci = [
  "JavaScript",
  "HTML",
  "CSS",
  "React",
  "Git"
];

const lista = document.querySelector("#lista-umiejetnosci");

for (const umiejetnosc of umiejetnosci) {
  const li = document.createElement("li");
  li.textContent = umiejetnosc;
  lista.appendChild(li);
}


const formularz = document.querySelector("form");
const komunikat = document.querySelector("#komunikat");

formularz.addEventListener("submit", function (event) {
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

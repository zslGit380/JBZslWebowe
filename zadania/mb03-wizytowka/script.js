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

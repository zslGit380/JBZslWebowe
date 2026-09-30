const gry = [
    { tytul: "Cyberpunk", cena: 129, ocena: 8 },
    { tytul: "Wiedźmin 3", cena: 79, ocena: 10 },
    { tytul: "Minecraft", cena: 99, ocena: 9 },
    { tytul: "Fortnite", cena: 0, ocena: 7 },
    { tytul: "Hades", cena: 69, ocena: 9 },
    { tytul: "Starfield", cena: 249, ocena: 6 }
];

const budujListe = (gry) =>
    gry.map(({ tytul, cena }) => `
        <li class="${cena < 80 ? 'wyrozniony' : ''}">
            ${tytul} - ${cena} zł
        </li>
    `).join("");

const zfiltrowaneDane = gry.filter((gra) => gra.ocena >= 8);

console.log(zfiltrowaneDane);

const lacznaCena = zfiltrowaneDane.reduce(
    (suma, { cena }) => suma + cena,
    0
);

document.querySelector("#lista").innerHTML =
    budujListe(zfiltrowaneDane);

document.querySelector("#podsumowanie").innerHTML =
    `Łączna cena: ${lacznaCena} zł, gier: ${zfiltrowaneDane.length}`;

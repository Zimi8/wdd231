import { places } from '../data/places.mjs';

const menuBtn = document.querySelector('#menuBtn');
const nav = document.querySelector('#primaryNav');
menuBtn.addEventListener('click', () => {
    nav.classList.toggle('open');
});

document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;

const msToDays = 86400000;
const lastVisit = localStorage.getItem("lastVisit");
const currentVisit = Date.now();
const visitMessage = document.getElementById("visit-message");

if (!lastVisit) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const timeDiff = currentVisit - parseInt(lastVisit);
    const daysDiff = Math.floor(timeDiff / msToDays);

    if (timeDiff < msToDays) {
        visitMessage.textContent = "Back so soon! Awesome!";
    } else {
        visitMessage.textContent = `You last visited ${daysDiff} ${daysDiff === 1 ? 'day' : 'days'} ago.`;
    }
}

localStorage.setItem("lastVisit", currentVisit);

const gridContainer = document.getElementById("discover-grid");

places.forEach(place => {
    const card = document.createElement("div");
    card.classList.add("discover-card");
    card.id = place.id;

    const title = document.createElement("h2");
    title.textContent = place.name;

    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = place.image;
    img.alt = place.name;
    img.loading = "lazy";
    img.width = 300;
    img.height = 200;
    figure.appendChild(img);

    const address = document.createElement("address");
    address.textContent = place.address;

    const desc = document.createElement("p");
    desc.textContent = place.description;

    const btn = document.createElement("button");
    btn.textContent = "Learn More";

    card.appendChild(title);
    card.appendChild(figure);
    card.appendChild(address);
    card.appendChild(desc);
    card.appendChild(btn);

    gridContainer.appendChild(card);
});
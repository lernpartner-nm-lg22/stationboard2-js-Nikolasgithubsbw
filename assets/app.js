"use strict";

const fromInput = document.getElementById("from");
const toInput = document.getElementById("to");
const searchButton = document.getElementById("searchButton");
const resultsContainer = document.getElementById("results");
const loadPreviousButton = document.getElementById("loadPreviousConnections");

let allConnections = []; // Speichert alle Verbindungen
let displayedConnections = 3; // Anzahl der Verbindungen, die zuerst angezeigt werden

// Funktion zum Laden der Verbindungen
const searchConnections = async () => {
    const from = fromInput.value;
    const to = toInput.value;

    const url = `https://transport.opendata.ch/v1/connections?from=${from}&to=${to}`;
    const response = await fetch(url);
    const data = await response.json();

    allConnections = data.connections;
    displayResults(allConnections.slice(0, displayedConnections));

    // Button "Frühere Verbindungen" anzeigen, falls es mehr als 3 Verbindungen gibt
    if (allConnections.length > displayedConnections) {
        loadPreviousButton.style.display = 'block';
    } else {
        loadPreviousButton.style.display = 'none';
    }
};

// Funktion zum Anzeigen der Verbindungen
const displayResults = (connections) => {
    resultsContainer.innerHTML = ''; // Vorherige Ergebnisse löschen

    connections.forEach(connection => {
        const card = document.createElement("div");
        card.classList.add("result-card");

        const time = document.createElement("div");
        time.classList.add("time");
        time.textContent = `Ab: ${connection.from.departure.split("T")[1].slice(0, 5)}`;

        const direction = document.createElement("div");
        direction.classList.add("direction");
        direction.textContent = `Nach: ${connection.to.station.name}`;

        const platform = document.createElement("div");
        platform.classList.add("platform");
        platform.textContent = `Gleis: ${connection.from.platform || 'N/A'}`;

        card.appendChild(time);
        card.appendChild(direction);
        card.appendChild(platform);

        resultsContainer.appendChild(card);
    });
};

// Funktion zum Laden früherer Verbindungen
const loadPreviousConnections = () => {
    // Zeigt alle Verbindungen an, falls der Button geklickt wird
    displayResults(allConnections);
    loadPreviousButton.style.display = 'none'; // Button ausblenden, nachdem frühere Verbindungen geladen wurden
};

searchButton.addEventListener("click", searchConnections);
loadPreviousButton.addEventListener("click", loadPreviousConnections);

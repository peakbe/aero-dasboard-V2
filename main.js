
document.addEventListener("DOMContentLoaded", () => {

    const map = L.map('map').setView([50.55, 4.9], 9);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    CONFIG.airports.forEach(airport => {
        addAirport(airport, map);
        loadWeather(airport);
        loadAircraft(airport, map);
        addNoiseMonitors(airport, map);
    });
});

function addAirport(airport, map) {
    L.marker([airport.lat, airport.lon])
        .addTo(map)
        .bindPopup(`<b>${airport.name}</b><br>${airport.code}`);
}

async function loadWeather(airport) {
    const container = document.getElementById("weather");

    try {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${airport.lat}&longitude=${airport.lon}&current_weather=true`
        );
        const data = await response.json();

        container.innerHTML += `
            <h3>${airport.code} - Météo</h3>
            <p>Température: ${data.current_weather.temperature}°C</p>
            <p>Vent: ${data.current_weather.windspeed} km/h</p>
        `;
    } catch {
        container.innerHTML += `<p>Erreur météo ${airport.code}</p>`;
    }
}

async function loadAircraft(airport, map) {
    const container = document.getElementById("aircrafts");

    // ⚠️ À remplacer par ton API aviation réelle
    const demoFlights = [
        ersegQzkf2Dfal-o26B4b5uzMrXBeHK2jOpOaY7nffc
    ];

    container.innerHTML += `<h3>${airport.code} - Avions confirmés</h3><ul>`;

    demoFlights.forEach(flight => {
        container.innerHTML += `<li>${flight.callsign}</li>`;

        L.circleMarker([flight.lat, flight.lon])
            .addTo(map)
            .bindPopup(`<b>${flight.callsign}</b><br>${airport.code}`);
    });

    container.innerHTML += "</ul>";
}

function addNoiseMonitors(airport, map) {
    const container = document.getElementById("noise");
    const monitors = CONFIG.noiseMonitors[airport.code];

    container.innerHTML += `<h3>${airport.code} - Sonomètres</h3><ul>`;

    monitors.forEach(m => {
        container.innerHTML += `<li>${m.name} : ${m.value} dB</li>`;

        L.circle([m.lat, m.lon], {
            radius: 500,
            color: "red"
        })
        .addTo(map)
        .bindPopup(`<b>${m.name}</b><br>${m.value} dB`);
    });

    container.innerHTML += "</ul>";
}

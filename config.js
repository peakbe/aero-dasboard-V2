
const CONFIG = {
    weatherApiKey: "TA_CLE_METEO_ICI",
    aviationApiKey: "TA_CLE_AVIATION_ICI",

    airports: [
        { code: "EBLG", name: "Liège Airport", lat: 50.637, lon: 5.443 },
        { code: "EBCI", name: "Charleroi Airport", lat: 50.459, lon: 4.453 }
    ],

    noiseMonitors: {
        EBLG: [
            { id: "LM1", name: "Liège Nord", lat: 50.65, lon: 5.45, value: 58 },
            { id: "LM2", name: "Liège Sud", lat: 50.62, lon: 5.43, value: 62 }
        ],
        EBCI: [
            { id: "CM1", name: "Charleroi Ouest", lat: 50.46, lon: 4.44, value: 55 },
            { id: "CM2", name: "Charleroi Est", lat: 50.46, lon: 4.47, value: 60 }
        ]
    }
};

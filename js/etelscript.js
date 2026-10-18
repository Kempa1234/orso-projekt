var rendelesek = [
    new Etel("Kovács Péter", "Tatabánya", "+36 30 356 4987", "Pizza"),
    new Etel("Nagy Anna", "Budapest", "+36 20 123 4567", "Gulyásleves"),
    new Etel("Szabó Gábor", "Győr", "06 70 987 6543", "Rántott hal")
];
var szerkesztendo = -1;
var torlendo = -1;

const sikeresModal = new bootstrap.Modal('#sikeresModal');
const hibaModal = new bootstrap.Modal('#hibaModal');


const KOZEP = [47.1625, 19.5033];

const terkep = L.map("terkep").setView(KOZEP, 7);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap contributors"
}).addTo(terkep);

const pontStilus = {
    radius: 8,
    color: "#ffffff",
    weight: 2,
    fillColor: "#198754",
    fillOpacity: 1
};

setTimeout(() => terkep.invalidateSize(), 0);

const pontok = new Map();

async function pontHozzaad(rendeles) {
    const nev = rendeles.getNev().trim();
    const varos = rendeles.getVaros().trim();
    let hely = null;

    if (varos) {
        try {
            const url = "https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=hu&q=" +
                encodeURIComponent(varos);
            const valasz = await fetch(url);
            const talalat = await valasz.json();
            if (talalat.length) hely = [parseFloat(talalat[0].lat), parseFloat(talalat[0].lon)];
        } catch (e) { }
    }

    if (!hely) {
        hely = [
            KOZEP[0] + (Math.random() - 0.5) * 1.2,
            KOZEP[1] + (Math.random() - 0.5) * 2.4
        ];
    }

    if (!rendelesek.includes(rendeles)) return;

    const pont = L.circleMarker(hely, pontStilus).addTo(terkep);
    pont.bindPopup([nev, varos].filter(Boolean).join(" – "));
    pontok.set(rendeles, pont);
}

function pontTorol(rendeles) {
    const pont = pontok.get(rendeles);
    if (pont) {
        pont.remove();
        pontok.delete(rendeles);
    }
}


function telefonEllenorzo(telefon) {
    var minta = /^(\+36|06)[\s-]?\d{1,2}[\s-]?\d{3}[\s-]?\d{3,4}$/;
    return minta.test(telefon);
}


function etelEllenorzo(etel) {
    etel = etel.trim();
    return etel.length >= 2 && etel.length <= 50;
}


function arEllenorzo(ar) {
    if (ar.trim() === "") return false;
    ar = Number(ar);
    return Number.isInteger(ar) && ar >= 1 && ar <= 100000;
}


function legnepszerubbEtel() {
    var szamlalo = {};
    var legjobb = null;
    for (let i = 0; i < rendelesek.length; i++) {
        var nev = rendelesek[i].getEtel();
        var kulcs = nev.trim().toLowerCase();
        if (!szamlalo[kulcs]) {
            szamlalo[kulcs] = { nev: nev, db: 0 };
        }
        szamlalo[kulcs].db++;
        if (legjobb === null || szamlalo[kulcs].db > legjobb.db) {
            legjobb = szamlalo[kulcs];
        }
    }
    return legjobb;
}


function kiir() {
    var tbody = document.querySelector("tbody");
    tbody.innerHTML = "";
    for (let i = 0; i < rendelesek.length; i++) {
        tbody.innerHTML += `<tr>
                                <th scope="row">${i + 1}</th>
                                <td>${rendelesek[i].getNev()}</td>
                                <td>${rendelesek[i].getVaros()}</td>
                                 <td>${rendelesek[i].getTelefon()}</td>
                                <td>${rendelesek[i].getEtel()}</td>
                                <td>${rendelesek[i].getAr().toLocaleString("hu-HU")} Ft</td>
                                <td><i class="bi bi-pencil-fill pe-4" onclick="szerkeszt(${i})"></i> <i class="bi bi-trash-fill text-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="megerosit(${i})"></i></td>
                            </tr>`;
    }

    var osszeg = 0;
    for (let i = 0; i < rendelesek.length; i++) {
        osszeg += rendelesek[i].getAr();
    }
    document.querySelector(".ertek-szoveg").textContent = "Összesen: " + osszeg.toLocaleString("hu-HU") + " Ft";
    document.querySelector(".osszes-szoveg").textContent = "Összes rendelés: " + rendelesek.length;

    var nepszeru = legnepszerubbEtel();
    document.querySelector(".nepszeru-szoveg").textContent = nepszeru === null
        ? "Még nincs rendelés"
        : nepszeru.nev + " (" + nepszeru.db + " db)";
}


function megerosit(index) {
    torlendo = index;
}

function szerkeszt(index) {
    var marka = document.querySelector(".marka");
    var varos = document.querySelector(".varos");
    var telefon = document.querySelector(".telefon");
    var etel = document.querySelector(".etel");
    var ar = document.querySelector(".ar");

    marka.value = rendelesek[index].getNev();
    varos.value = rendelesek[index].getVaros();
    telefon.value = rendelesek[index].getTelefon();
    etel.value = rendelesek[index].getEtel();
    ar.value = rendelesek[index].getAr();

    document.querySelector(".hozzaad").innerHTML = "Frissítés";
    szerkesztendo = index;
}

document.querySelector(".hozzaad").addEventListener('click', () => {
    var marka = document.querySelector(".marka");
    var varos = document.querySelector(".varos");
    var telefon = document.querySelector(".telefon");
    var etel = document.querySelector(".etel");
    var ar = document.querySelector(".ar");

    if (marka.value == "" || varos.value == "" || etel.value.trim() == "" || ar.value.trim() == "") {
        document.querySelector("#hibaModal .modal-body").innerHTML = "<p>Minden mezőt ki kell tölteni!</p>";
        hibaModal.show();
        return;
    }
    if (!telefonEllenorzo(telefon.value)) {
        document.querySelector("#hibaModal .modal-body").innerHTML = "<p>Hibás telefonszám! Pl.: +36 30 356 4987</p>";
        hibaModal.show();
        return;
    }
    if (!etelEllenorzo(etel.value)) {
        document.querySelector("#hibaModal .modal-body").innerHTML = "<p>Hibás étel! 2 és 50 karakter között kell lennie. Pl.: Pizza</p>";
        hibaModal.show();
        return;
    }

    if (!arEllenorzo(ar.value)) {
        document.querySelector("#hibaModal .modal-body").innerHTML = "<p>Hibás ár! 1 és 100000 Ft közötti egész szám kell. Pl.: 3500</p>";
        hibaModal.show();
        return;
    }

    if (szerkesztendo == -1) {
        var r = new Etel(marka.value, varos.value, telefon.value, etel.value, ar.value);
        rendelesek.push(r);
        document.querySelector("#sikeresModal .modal-title").innerHTML = "Sikeres hozzáadás";
        document.querySelector("#sikeresModal .modal-body").innerHTML = "A rendelés hozzáadása sikeresen megtörtént";
        sikeresModal.show();
        pontHozzaad(r);
    } else {
        var modositott = rendelesek[szerkesztendo];
        var regiNev = modositott.getNev();
        var regiVaros = modositott.getVaros();

        rendelesek[szerkesztendo].setNev(marka.value);
        rendelesek[szerkesztendo].setVaros(varos.value);
        rendelesek[szerkesztendo].setTelefon(telefon.value);
        rendelesek[szerkesztendo].setEtel(etel.value);
        rendelesek[szerkesztendo].setAr(ar.value);

        if (modositott.getNev() !== regiNev || modositott.getVaros() !== regiVaros) {
            pontTorol(modositott);
            pontHozzaad(modositott);
        }
        szerkesztendo = -1;
        document.querySelector(".hozzaad").innerHTML = "Hozzáadás";
    }

    marka.value = varos.value = telefon.value = etel.value = ar.value = "";
    kiir();
});


document.querySelector(".megse").addEventListener('click', () => {
    document.querySelector(".marka").value = "";
    document.querySelector(".varos").value = "";
    document.querySelector(".telefon").value = "";
    document.querySelector(".etel").value = "";
    document.querySelector(".ar").value = "";
    document.querySelector(".hozzaad").innerHTML = "Hozzáadás";
    szerkesztendo = -1;
});

document.querySelector(".torles").addEventListener('click', () => {
    var torolt = rendelesek[torlendo];
    rendelesek.splice(torlendo, 1);
    pontTorol(torolt);
    szerkesztendo = -1;
    document.querySelector(".hozzaad").innerHTML = "Hozzáadás";
    kiir();
});

kiir();
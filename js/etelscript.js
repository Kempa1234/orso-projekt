var rendelesek = [
    new Etel("Kiss Péter", "Bejön érte az éttermünkbe", "1111 Budapest, Fő utca 12."),
    new Etel("Nagy Anna", "Kiszállítás (+600FT)", "2030 Érd, Tárnoki út 5., 2. emelet 4. ajtó")
];

// Az Etel osztály csak név, étel (átvétel módja) és cím adatot tárol,
// ezért a szerkesztéshez szükséges részletes adatokat külön tömbben tartjuk.
var reszletek = [
    { irsz: "1111", varos: "Budapest", utca: "Fő utca", hazszam: "12.", emelet: "", ajto: "", telefon: "+36 30 356 4987" },
    { irsz: "2030", varos: "Érd", utca: "Tárnoki út", hazszam: "5.", emelet: "2", ajto: "4", telefon: "06-20-123-4567" }
];

var szerkesztendo = -1;

const telefonMinta = /^(\+36|06)[\s-]?\d{1,2}[\s-]?\d{3}[\s-]?\d{3,4}$/;

// Mezők
const nevInput = document.querySelector(".marka");
const irszInput = document.querySelector(".iranyitoszam");
const varosInput = document.querySelector(".varos");
const utcaInput = document.querySelector(".utca");
const hazszamInput = document.querySelector(".hazszam");
const emeletInput = document.querySelector(".emelet");
const ajtoInput = document.querySelector(".ajto");
const telefonInput = document.querySelector(".telefon");
const kiszallitasSelect = document.querySelector(".szin");
const hozzaadGomb = document.querySelector(".hozzaad");
const megseGomb = document.querySelector(".megse");

function cimEpit(r) {
    var cim = `${r.irsz} ${r.varos}, ${r.utca} ${r.hazszam}`;
    if (r.emelet !== "") {
        cim += `, ${r.emelet}. emelet`;
    }
    if (r.ajto !== "") {
        cim += ` ${r.ajto}. ajtó`;
    }
    return cim;
}

function kiir() {
    var tbody = document.querySelector("tbody");
    tbody.innerHTML = "";
    for (let i = 0; i < rendelesek.length; i++) {
        tbody.innerHTML += `<tr>
                                <th scope="row">${i + 1}</th>
                                <td>${rendelesek[i].getNev()}</td>
                                <td>${rendelesek[i].getCim()}</td>
                                <td>
                                    <i class="bi bi-pencil-fill pe-4" style="cursor:pointer" onclick="szerkeszt(${i})"></i>
                                    <i class="bi bi-trash-fill text-danger" style="cursor:pointer" onclick="torol(${i})"></i>
                                </td>
                            </tr>`;
    }
    osszesFrissit();
}

function osszesFrissit() {
    document.querySelectorAll(".card-text").forEach(p => {
        p.innerHTML = `Összes rendelés: ${rendelesek.length}`;
    });
}

function urlapUrit() {
    nevInput.value = irszInput.value = varosInput.value = utcaInput.value = "";
    hazszamInput.value = emeletInput.value = ajtoInput.value = telefonInput.value = "";
    kiszallitasSelect.value = "";
    szerkesztendo = -1;
    hozzaadGomb.innerHTML = "Hozzáadás";
}

function urlapAdatok() {
    return {
        nev: nevInput.value.trim(),
        kiszallitas: kiszallitasSelect.value === "" ? "" : kiszallitasSelect.selectedOptions[0].textContent.trim(),
        reszlet: {
            irsz: irszInput.value.trim(),
            varos: varosInput.value.trim(),
            utca: utcaInput.value.trim(),
            hazszam: hazszamInput.value.trim(),
            emelet: emeletInput.value.trim(),
            ajto: ajtoInput.value.trim(),
            telefon: telefonInput.value.trim()
        }
    };
}

function ervenyes(adat) {
    var r = adat.reszlet;
    if (adat.nev === "" || r.varos === "" || r.utca === "" || r.hazszam === "") {
        alert("Kérem töltse ki a kötelező mezőket (név, város, utca, házszám)!");
        return false;
    }
    if (!/^[0-9]{4}$/.test(r.irsz)) {
        alert("Az irányítószám pontosan 4 számjegyből álljon!");
        return false;
    }
    if (!telefonMinta.test(r.telefon)) {
        alert("Hibás telefonszám! Pl.: +36 30 356 4987 vagy 06-30-356-4987");
        return false;
    }
    if (adat.kiszallitas === "") {
        alert("Válasszon kiszállítási módot!");
        return false;
    }
    return true;
}

function szerkeszt(index) {
    var r = reszletek[index];
    nevInput.value = rendelesek[index].getNev();
    irszInput.value = r.irsz;
    varosInput.value = r.varos;
    utcaInput.value = r.utca;
    hazszamInput.value = r.hazszam;
    emeletInput.value = r.emelet;
    ajtoInput.value = r.ajto;
    telefonInput.value = r.telefon;

    // a select a megjelenített szöveg alapján keresi meg a megfelelő opciót
    var etel = rendelesek[index].getEtel();
    for (let opt of kiszallitasSelect.options) {
        if (opt.textContent.trim() === etel) {
            kiszallitasSelect.value = opt.value;
        }
    }

    szerkesztendo = index;
    hozzaadGomb.innerHTML = "Frissítés";
    nevInput.focus();
}

function torol(index) {
    if (confirm("Biztosan lemondja a(z) " + rendelesek[index].getNev() + " rendelését?")) {
        rendelesek.splice(index, 1);
        reszletek.splice(index, 1);
        if (szerkesztendo === index) {
            urlapUrit();
        }
        kiir();
    }
}

hozzaadGomb.addEventListener("click", () => {
    var adat = urlapAdatok();
    if (!ervenyes(adat)) {
        return;
    }
    var cim = cimEpit(adat.reszlet);

    if (szerkesztendo === -1) {
        // új rendelés
        rendelesek.push(new Etel(adat.nev, adat.kiszallitas, cim));
        reszletek.push(adat.reszlet);
        alert("A rendelés sikeresen hozzáadva!");
    } else {
        // meglévő rendelés frissítése
        rendelesek[szerkesztendo].setNev(adat.nev);
        rendelesek[szerkesztendo].setEtel(adat.kiszallitas);
        rendelesek[szerkesztendo].setCim(cim);
        reszletek[szerkesztendo] = adat.reszlet;
        alert("A rendelés sikeresen módosítva!");
    }

    urlapUrit();
    kiir();
});

megseGomb.addEventListener("click", urlapUrit);

// Óra a navigációs sávban
function ora() {
    var ido = document.querySelector(".ido");
    ido.innerHTML = new Date().toLocaleTimeString("hu-HU");
}
setInterval(ora, 1000);
ora();

kiir();
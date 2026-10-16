var rendelesek = [];

var szerkesztendo = -1;

const telefonMinta = /^(\+36|06)[\s-]?\d{1,2}[\s-]?\d{3}[\s-]?\d{3,4}$/;


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

function kiir() {
    var tbody = document.querySelector("tbody");
    tbody.innerHTML = "";
    for (let i = 0; i < rendelesek.length; i++) {
        tbody.innerHTML += `<tr>
                                <th scope="row">${i + 1}</th>
                                <td>${rendelesek[i].getNev()}</td>
                                <td>${rendelesek[i].getCim()}</td>
                                <td>${rendelesek[i].getEtel()}</td>
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
        irsz: irszInput.value.trim(),
        varos: varosInput.value.trim(),
        utca: utcaInput.value.trim(),
        hazszam: hazszamInput.value.trim(),
        emelet: emeletInput.value.trim(),
        ajto: ajtoInput.value.trim(),
        telefon: telefonInput.value.trim()
    };
}

function ervenyes(a) {
    if (a.nev === "" || a.varos === "" || a.utca === "" || a.hazszam === "") {
        alert("Kérem töltse ki a kötelező mezőket (név, város, utca, házszám)!");
        return false;
    }
    if (!/^[0-9]{4}$/.test(a.irsz)) {
        alert("Az irányítószám pontosan 4 számjegyből álljon!");
        return false;
    }
    if (!telefonMinta.test(a.telefon)) {
        alert("Hibás telefonszám! Pl.: +36 30 356 4987 vagy 06-30-356-4987");
        return false;
    }
    if (a.kiszallitas === "") {
        alert("Válasszon kiszállítási módot!");
        return false;
    }
    return true;
}

function szerkeszt(index) {
    var r = rendelesek[index];
    nevInput.value = r.getNev();
    irszInput.value = r.getIrsz();
    varosInput.value = r.getVaros();
    utcaInput.value = r.getUtca();
    hazszamInput.value = r.getHazszam();
    emeletInput.value = r.getEmelet();
    ajtoInput.value = r.getAjto();
    telefonInput.value = r.getTelefon();

    for (let opt of kiszallitasSelect.options) {
        if (opt.textContent.trim() === r.getEtel()) {
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
        if (szerkesztendo === index) {
            urlapUrit();
        } else if (szerkesztendo > index) {
            szerkesztendo--;
        }
        kiir();
    }
}

hozzaadGomb.addEventListener("click", () => {
    var a = urlapAdatok();
    if (!ervenyes(a)) {
        return;
    }

    if (szerkesztendo === -1) {
        rendelesek.push(new Etel(a.nev, a.kiszallitas, a.irsz, a.varos, a.utca, a.hazszam, a.emelet, a.ajto, a.telefon));
        alert("A rendelés sikeresen hozzáadva!");
    } else {
        var r = rendelesek[szerkesztendo];
        r.setNev(a.nev);
        r.setEtel(a.kiszallitas);
        r.setIrsz(a.irsz);
        r.setVaros(a.varos);
        r.setUtca(a.utca);
        r.setHazszam(a.hazszam);
        r.setEmelet(a.emelet);
        r.setAjto(a.ajto);
        r.setTelefon(a.telefon);
        alert("A rendelés sikeresen módosítva!");
    }

    urlapUrit();
    kiir();
});

megseGomb.addEventListener("click", urlapUrit);




kiir();
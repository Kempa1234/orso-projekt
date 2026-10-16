var rendelesek = [
    new Etel("Pista", "Budapest", "+36 30 356 4987")
];
var szerkesztendo = -1;
var torlendo = -1;

const sikeresModal = new bootstrap.Modal('#sikeresModal');
const hibaModal = new bootstrap.Modal('#hibaModal');

function telefonEllenorzo(telefon) {
    var minta = /^(\+36|06)[\s-]?\d{1,2}[\s-]?\d{3}[\s-]?\d{3,4}$/;
    return minta.test(telefon);
}

function kiir() {
    var tbody = document.querySelector("tbody");
    tbody.innerHTML = "";
    for (let i = 0; i < rendelesek.length; i++) {
        tbody.innerHTML += `<tr>
                                <th scope="row">${i + 1}</th>
                                <td>${rendelesek[i].getNev()}</td>
                                <td>${rendelesek[i].getVaros()}</td>
                                <td><i class="bi bi-pencil-fill pe-4" onclick="szerkeszt(${i})"></i> <i class="bi bi-trash-fill text-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="megerosit(${i})"></i></td>
                            </tr>`;
    }

    var szovegek = document.querySelectorAll(".card-text");
    for (let i = 0; i < szovegek.length; i++) {
        szovegek[i].innerHTML = "Összes rendelés: " + rendelesek.length;
    }
}

function megerosit(index) {
    torlendo = index;
}

function szerkeszt(index) {
    var marka = document.querySelector(".marka");
    var varos = document.querySelector(".varos");
    var telefon = document.querySelector(".telefon");

    marka.value = rendelesek[index].getNev();
    varos.value = rendelesek[index].getVaros();
    telefon.value = rendelesek[index].getTelefon();

    document.querySelector(".hozzaad").innerHTML = "Frissítés";
    szerkesztendo = index;
}

document.querySelector(".hozzaad").addEventListener('click', () => {
    var marka = document.querySelector(".marka");
    var varos = document.querySelector(".varos");
    var telefon = document.querySelector(".telefon");

    if (marka.value == "" || varos.value == "") {
        document.querySelector("#hibaModal .modal-body").innerHTML = "<p>Minden mezőt ki kell tölteni!</p>";
        hibaModal.show();
        return;
    }
    if (!telefonEllenorzo(telefon.value)) {
        document.querySelector("#hibaModal .modal-body").innerHTML = "<p>Hibás telefonszám! Pl.: +36 30 356 4987</p>";
        hibaModal.show();
        return;
    }

    if (szerkesztendo == -1) {
        var r = new Etel(marka.value, varos.value, telefon.value);
        rendelesek.push(r);
        document.querySelector("#sikeresModal .modal-title").innerHTML = "Sikeres hozzáadás";
        document.querySelector("#sikeresModal .modal-body").innerHTML = "A rendelés hozzáadása sikeresen megtörtént";
    } else {
        rendelesek[szerkesztendo].setNev(marka.value);
        rendelesek[szerkesztendo].setVaros(varos.value);
        rendelesek[szerkesztendo].setTelefon(telefon.value);
        document.querySelector("#sikeresModal .modal-title").innerHTML = "Sikeres frissítés";
        document.querySelector("#sikeresModal .modal-body").innerHTML = "A rendelés szerkesztése sikeresen megtörtént";
        szerkesztendo = -1;
        document.querySelector(".hozzaad").innerHTML = "Hozzáadás";
    }

    marka.value = varos.value = telefon.value = "";
    kiir();
    sikeresModal.show();
});

document.querySelector(".megse").addEventListener('click', () => {
    document.querySelector(".marka").value = "";
    document.querySelector(".varos").value = "";
    document.querySelector(".telefon").value = "";
    document.querySelector(".hozzaad").innerHTML = "Hozzáadás";
    szerkesztendo = -1;
});

document.querySelector(".torles").addEventListener('click', () => {
    rendelesek.splice(torlendo, 1);
    szerkesztendo = -1;
    document.querySelector(".hozzaad").innerHTML = "Hozzáadás";
    kiir();
});

kiir();
class Etel {
    #nev;
    #varos;
    #telefon;

    constructor(nev, varos, telefon) {
        this.setNev(nev);
        this.setVaros(varos);
        this.setTelefon(telefon);
    }

    setNev(nev) {
        if (nev === "") {
            return false;
        }
        this.#nev = nev;
        return true;
    }

    setVaros(varos) {
        if (varos === "") {
            return false;
        }
        this.#varos = varos;
        return true;
    }

    setTelefon(telefon) {
        if (!/^(\+36|06)[\s-]?\d{1,2}[\s-]?\d{3}[\s-]?\d{3,4}$/.test(telefon)) {
            return false;
        }
        this.#telefon = telefon;
        return true;
    }

    getNev() {
        return this.#nev;
    }

    getVaros() {
        return this.#varos;
    }

    getTelefon() {
        return this.#telefon;
    }
}
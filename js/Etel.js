class Etel {
    #nev;
    #varos;
    #telefon;
    #etel;
    #ar = 0;

    constructor(nev, varos, telefon, etel, ar) {
        this.setNev(nev);
        this.setVaros(varos);
        this.setTelefon(telefon);
        this.setEtel(etel);
        this.setAr(ar);
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

    setEtel(etel) {
        if (typeof etel !== "string") {
            return false;
        }
        etel = etel.trim();
        if (etel.length < 2 || etel.length > 50) {
            return false;
        }
        this.#etel = etel;
        return true;
    }

    setAr(ar) {
        ar = Number(ar);
        if (!Number.isInteger(ar) || ar < 1 || ar > 100000) {
            return false;
        }
        this.#ar = ar;
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

    getEtel() {
        return this.#etel;
    }

    getAr() {
        return this.#ar;
    }
}
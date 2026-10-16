class Etel {
    #nev;
    #etel;
    #cim;

    constructor(nev, etel, cim) {
        this.setNev(nev);
        this.setEtel(etel);
        this.setCim(cim);
    }

    setNev(nev) {
        if (nev === "") {
            return false;
        }
        this.#nev = nev;
        return true;
    }

    setEtel(etel) {
        if (etel === "") {
            return false;
        }
        this.#etel = etel;
        return true;
    }

    setCim(cim) {
        if (cim === "") {
            return false;
        }
        this.#cim = cim;
        return true;
    }

    getNev() {
        return this.#nev;
    }

    getEtel() {
        return this.#etel;
    }

    getCim() {
        return this.#cim;
    }
}
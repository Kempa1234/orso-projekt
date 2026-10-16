class Etel {
    #nev;
    #etel;
    #irsz;
    #varos;
    #utca;
    #hazszam;
    #emelet;
    #ajto;
    #telefon;
    
    //ai
    static #telefonMinta = /^(\+36|06)[\s-]?\d{1,2}[\s-]?\d{3}[\s-]?\d{3,4}$/;

    constructor(nev, etel, irsz, varos, utca, hazszam, emelet = "", ajto = "", telefon) {
        this.setNev(nev);
        this.setEtel(etel);
        this.setIrsz(irsz);
        this.setVaros(varos);
        this.setUtca(utca);
        this.setHazszam(hazszam);
        this.setEmelet(emelet);
        this.setAjto(ajto);
        this.setTelefon(telefon);
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
//ai
    setIrsz(irsz) {
        if (!/^[0-9]{4}$/.test(irsz)) {
            return false;
        }
        this.#irsz = irsz;
        return true;
    }

    setVaros(varos) {
        if (varos === "") {
            return false;
        }
        this.#varos = varos;
        return true;
    }

    setUtca(utca) {
        if (utca === "") {
            return false;
        }
        this.#utca = utca;
        return true;
    }

    setHazszam(hazszam) {
        if (hazszam === "") {
            return false;
        }
        this.#hazszam = hazszam;
        return true;
    }

    setEmelet(emelet) {
        this.#emelet = emelet;
        return true;
    }

    setAjto(ajto) {
        this.#ajto = ajto;
        return true;
    }

//ai
    setTelefon(telefon) {
        if (!Etel.#telefonMinta.test(telefon)) {
            return false;
        }
        this.#telefon = telefon;
        return true;
    }

    getNev() {
        return this.#nev;
    }

    getEtel() {
        return this.#etel;
    }

    getIrsz() {
        return this.#irsz;
    }

    getVaros() {
        return this.#varos;
    }

    getUtca() {
        return this.#utca;
    }

    getHazszam() {
        return this.#hazszam;
    }

    getEmelet() {
        return this.#emelet;
    }

    getAjto() {
        return this.#ajto;
    }

    getTelefon() {
        return this.#telefon;
    }


    getCim() {
        var cim = `${this.#irsz} ${this.#varos}, ${this.#utca} ${this.#hazszam}`;
        if (this.#emelet !== "") {
            cim += `, ${this.#emelet}. emelet`;
        }
        if (this.#ajto !== "") {
            cim += ` ${this.#ajto}. ajtó`;
        }
        return cim;
    }
}
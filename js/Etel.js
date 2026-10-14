class Etel {
    #nev;
    #etel;
    #cim;
    constructor(nev, etel, cim){
        this.setNev(nev);
        this.setEtel(etel);
        this.setCim(cim);
    }
    setNev(nev){
        this.#nev = nev;
    }
    setEtel(etel){
        this.#etel = etel;
    }    
    setCim(cim){
        this.#cim = cim;
    }

    getNev(){
        return this.#nev
    }
    getEtel(){
        return this.#etel
    }
    getCim(){
        return this.#cim
    }

}
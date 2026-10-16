var etel1 = new Etel("Pista", "Gulyás", "1111", "Budapest", "Fő utca", "12.", "", "", "+36 30 356 4987");
var etel2 = new Etel("", "Pörkölt", "2030", "Érd", "Tárnoki út", "5.", "2", "4", "06-20-123-4567");


console.assert(etel1.getNev() === "Pista" && etel1.getEtel() === "Gulyás", "Hiba a konstruktorban: nev vagy etel");
console.assert(etel1.getCim() === "1111 Budapest, Fő utca 12.", "Hiba a getCim() metodusban: emelet es ajto nelkul");
console.assert(etel2.getNev() === undefined && etel2.getVaros() === "Érd", "Hiba a konstruktorban: ures nev eseten a tobbit be kell allitani");
console.assert(etel2.getCim() === "2030 Érd, Tárnoki út 5., 2. emelet 4. ajtó", "Hiba a getCim() metodusban: emelettel es ajtoval");

console.assert(etel1.setNev("Jani") === true && etel1.getNev() === "Jani", "Hiba a setNev() metodusban: helyes nev");
console.assert(etel1.setNev("") === false && etel1.getNev() === "Jani", "Hiba a setNev() metodusban: ures nev");
console.assert(etel1.setEtel("Lecsó") === true && etel1.getEtel() === "Lecsó", "Hiba a setEtel() metodusban: helyes etel");
console.assert(etel1.setEtel("") === false && etel1.getEtel() === "Lecsó", "Hiba a setEtel() metodusban: ures etel");
console.assert(etel1.setIrsz("4024") === true && etel1.getIrsz() === "4024", "Hiba a setIrsz() metodusban: helyes iranyitoszam");
console.assert(etel1.setIrsz("12a4") === false && etel1.getIrsz() === "4024", "Hiba a setIrsz() metodusban: hibas iranyitoszam");
console.assert(etel1.setVaros("Debrecen") === true && etel1.getVaros() === "Debrecen", "Hiba a setVaros() metodusban: helyes varos");
console.assert(etel1.setVaros("") === false && etel1.getVaros() === "Debrecen", "Hiba a setVaros() metodusban: ures varos");
console.assert(etel1.setUtca("Piac utca") === true && etel1.getUtca() === "Piac utca", "Hiba a setUtca() metodusban: helyes utca");
console.assert(etel1.setUtca("") === false && etel1.getUtca() === "Piac utca", "Hiba a setUtca() metodusban: ures utca");
console.assert(etel1.setHazszam("20/A") === true && etel1.getHazszam() === "20/A", "Hiba a setHazszam() metodusban: helyes hazszam");
console.assert(etel1.setHazszam("") === false && etel1.getHazszam() === "20/A", "Hiba a setHazszam() metodusban: ures hazszam");
console.assert(etel1.setEmelet("3") === true && etel1.getEmelet() === "3", "Hiba a setEmelet() metodusban");
console.assert(etel1.setAjto("7") === true && etel1.getAjto() === "7", "Hiba a setAjto() metodusban");
console.assert(etel1.setTelefon("06-30-111-2222") === true && etel1.getTelefon() === "06-30-111-2222", "Hiba a setTelefon() metodusban: helyes telefonszam");
console.assert(etel1.setTelefon("12345") === false && etel1.getTelefon() === "06-30-111-2222", "Hiba a setTelefon() metodusban: hibas telefonszam");
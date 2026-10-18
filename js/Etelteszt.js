var etel1 = new Etel("Pista", "Budapest", "+36 30 356 4987", "Pizza");
var etel2 = new Etel("", "Érd", "06-20-123-4567", "Gyros");

console.assert(etel1.getNev() === "Pista" && etel1.getVaros() === "Budapest", "Hiba a konstruktorban: nev vagy varos");
console.assert(etel1.getTelefon() === "+36 30 356 4987", "Hiba a konstruktorban: telefon");
console.assert(etel2.getNev() === undefined && etel2.getVaros() === "Érd", "Hiba a konstruktorban: ures nev eseten a tobbit be kell allitani");

console.assert(etel1.setNev("Jani") === true && etel1.getNev() === "Jani", "Hiba a setNev() metodusban: helyes nev");
console.assert(etel1.setNev("") === false && etel1.getNev() === "Jani", "Hiba a setNev() metodusban: ures nev");
console.assert(etel1.setVaros("Debrecen") === true && etel1.getVaros() === "Debrecen", "Hiba a setVaros() metodusban: helyes varos");
console.assert(etel1.setVaros("") === false && etel1.getVaros() === "Debrecen", "Hiba a setVaros() metodusban: ures varos");
console.assert(etel1.setTelefon("06-30-111-2222") === true && etel1.getTelefon() === "06-30-111-2222", "Hiba a setTelefon() metodusban: helyes telefonszam");
console.assert(etel1.setTelefon("12345") === false && etel1.getTelefon() === "06-30-111-2222", "Hiba a setTelefon() metodusban: hibas telefonszam");

console.assert(etel1.getEtel() === "Pizza", "Hiba a konstruktorban: etel");
console.assert(etel2.getEtel() === "Gyros", "Hiba a konstruktorban: ures nev eseten az etelt is be kell allitani");
console.assert(etel1.setEtel("Gulyásleves") === true && etel1.getEtel() === "Gulyásleves", "Hiba a setEtel() metodusban: helyes etel");
console.assert(etel1.setEtel("  Rántott hús  ") === true && etel1.getEtel() === "Rántott hús", "Hiba a setEtel() metodusban: szokozok levagasa");
console.assert(etel1.setEtel("") === false && etel1.getEtel() === "Rántott hús", "Hiba a setEtel() metodusban: ures etel");
console.assert(etel1.setEtel("a") === false && etel1.getEtel() === "Rántott hús", "Hiba a setEtel() metodusban: tul rovid etel");
console.assert(etel1.setEtel("a".repeat(51)) === false && etel1.getEtel() === "Rántott hús", "Hiba a setEtel() metodusban: tul hosszu etel");
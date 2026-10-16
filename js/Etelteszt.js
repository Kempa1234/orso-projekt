var etel1 = new Etel("Pista", "Gulyás", "Budapest");
var etel2 = new Etel("", "Pörkölt", "Szeged");


console.assert(etel1.getNev() === "Pista", "Hiba a konstruktor beallitasaban: a nev nem megfelelo");
console.assert(etel1.getEtel() === "Gulyás", "Hiba a konstruktor beallitasaban: az etel nem megfelelo");
console.assert(etel1.getCim() === "Budapest", "Hiba a konstruktor beallitasaban: a cim nem megfelelo");
console.assert(etel2.getNev() === undefined, "Hiba a konstruktor beallitasaban: ures nevet nem szabad beallitani");
console.assert(etel2.getEtel() === "Pörkölt", "Hiba a konstruktor beallitasaban: ures nev eseten a tobbi adatot is be kell allitani");


console.assert(etel1.setNev("Jani") === true, "Hiba a setNev() metodusban, mert helyes nevre nem true-t ad");
console.assert(etel1.getNev() === "Jani", "Hiba a setNev() metodusban, mert nem allitja be az uj nevet");
console.assert(etel1.setNev("") === false, "Hiba a setNev() metodusban, mert ures nevre nem false-t ad");
console.assert(etel1.getNev() === "Jani", "Hiba a setNev() metodusban, mert ures nev eseten megvaltoztatja a nevet");


console.assert(etel1.setEtel("Lecsó") === true, "Hiba a setEtel() metodusban, mert helyes etelre nem true-t ad");
console.assert(etel1.getEtel() === "Lecsó", "Hiba a setEtel() metodusban, mert nem allitja be az uj etelt");
console.assert(etel1.setEtel("") === false, "Hiba a setEtel() metodusban, mert ures etelre nem false-t ad");
console.assert(etel1.getEtel() === "Lecsó", "Hiba a setEtel() metodusban, mert ures etel eseten megvaltoztatja az etelt");


console.assert(etel1.setCim("Debrecen") === true, "Hiba a setCim() metodusban, mert helyes cimre nem true-t ad");
console.assert(etel1.getCim() === "Debrecen", "Hiba a setCim() metodusban, mert nem allitja be az uj cimet");
console.assert(etel1.setCim("") === false, "Hiba a setCim() metodusban, mert ures cimre nem false-t ad");
console.assert(etel1.getCim() === "Debrecen", "Hiba a setCim() metodusban, mert ures cim eseten megvaltoztatja a cimet");
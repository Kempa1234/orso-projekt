 var today = new Date();
 var ido = document.querySelector(".ido");
 ido.innerHTML = today;
const myModal = new bootstrap.Modal('#myModal', {
  keyboard: false
})

document.getElementById('imageInput').addEventListener('change', function(event) {
    const file = event.target.files[0]; 

    if (file) {
        const preview = document.getElementById('previewImage');
        
        preview.src = URL.createObjectURL(file); 
    }
});

function nevellenorzo() {
    if(document.querySelector(".felhasznalonev").value.length < 30 && document.querySelector(".felhasznalonev").value.length > 2 ){ 
        return true;
    }
    return false;
}
function emaillenorzo() {
    if(document.querySelector(".email").value.length < 30 && document.querySelector(".email").value.length > 2 ){ 
        return true;
    }
    return false;
}
function teljes_nevellenorzo() {
    if(document.querySelector(".teljes_nev").value.length < 30 && document.querySelector(".teljes_nev").value.length > 2 ){ 
        return true;
    }
    return false;
       
}
function jelszoellenorzo(){
      if(document.querySelector(".regijelszo").value.length < 30 && document.querySelector(".regijelszo").value.length > 2 ){ 
        return true;
    }
    return false;
}
function ujjelszoellenorzo(){
      if(document.querySelector(".ujjelszo").value.length < 30 && document.querySelector(".ujjelszo").value.length > 2 ){ 
        return true;
    }
    return false;
}

document.querySelector(".mentes").addEventListener("click", () => {
    if(nevellenorzo() == true && emaillenorzo() == true && teljes_nevellenorzo() == true){
        var felhasznalonevbeir = document.querySelector(".felhasznalonevbeir");
        var felhasznalonev = document.querySelector(".felhasznalonev").value;
        var teljes_nev = document.querySelector(".teljes_nev").value;
        var teljesnevbeir = document.querySelector(".teljesnevbeir");
        var email = document.querySelector(".email").value;
        var emailbeir = document.querySelector(".emailbeir");
    }else{
        myModal.show();
        var modalbody = document.querySelector(".modal-body");
        modalbody.innerHTML="A felhasználónév, email vagy a teljes neved rossz! csakis 2 és 30 között lehet a karakterek száma!"
    }



  emailbeir.innerHTML= "";
  emailbeir.innerHTML= `Email: ${email}`
  teljesnevbeir.innerHTML="";
  teljesnevbeir.innerHTML= `Teljes név: ${teljes_nev}`
  felhasznalonevbeir.innerHTML="";
  felhasznalonevbeir.innerHTML=`${felhasznalonev}`;
});
document.querySelector(".jelszomentes").addEventListener("click", () =>{
if(jelszoellenorzo() == true && ujjelszoellenorzo() == true){
    var ujjelszo = document.querySelector(".ujjelszo");
    var regijelszo = document.querySelector(".regijelszo");
    ujjelszo.value = "";
    regijelszo.value = "";
}else{
    myModal.show();
        var modalbody = document.querySelector(".modal-body");
        modalbody.innerHTML=""
}
})




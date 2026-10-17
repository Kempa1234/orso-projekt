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

document.querySelector(".mentes").addEventListener("click", () => {
    if(nevellenorzo() == true){
  var felhasznalonevbeir = document.querySelector(".felhasznalonevbeir");
  var felhasznalonev = document.querySelector(".felhasznalonev").value;
    }
    if(emaillenorzo() == true){
  var email = document.querySelector(".email").value;
  var emailbeir = document.querySelector(".emailbeir");
    }
    if (teljes_nevellenorzo() == true) {
    var teljes_nev = document.querySelector(".teljes_nev").value;
    var teljesnevbeir = document.querySelector(".teljesnevbeir");
    }



  emailbeir.innerHTML= "";
  emailbeir.innerHTML= `Email: ${email}`
  teljesnevbeir.innerHTML="";
  teljesnevbeir.innerHTML= `Teljes név: ${teljes_nev}`
  felhasznalonevbeir.innerHTML="";
  felhasznalonevbeir.innerHTML=`${felhasznalonev}`;
});




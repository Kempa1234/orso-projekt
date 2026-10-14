 var today = new Date();
 var ido = document.querySelector(".ido");
 ido.innerHTML = today;
 //A 14. sorig ai írta
document.getElementById('imageInput').addEventListener('change', function(event) {
    const file = event.target.files[0]; 

    if (file) {
        const preview = document.getElementById('previewImage');
        
        preview.src = URL.createObjectURL(file); 
    }
});

document.querySelector(".mentes").addEventListener("click", () => {
  var email = document.querySelector(".email").value;
  var emailbeir = document.querySelector(".emailbeir");
  var teljes_nev = document.querySelector(".teljes_nev").value;
  var teljesnevbeir = document.querySelector(".teljesnevbeir");
  var felhasznalonevbeir = document.querySelector(".felhasznalonevbeir");
  var felhasznalonev = document.querySelector(".felhasznalonev").value;

  emailbeir.innerHTML= "";
  emailbeir.innerHTML= `Email: ${email}`
  teljesnevbeir.innerHTML="";
  teljesnevbeir.innerHTML= `Teljes név: ${teljes_nev}`
  felhasznalonevbeir.innerHTML="";
  felhasznalonevbeir.innerHTML=`${felhasznalonev}`;
});


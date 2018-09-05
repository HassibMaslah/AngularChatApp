function surligne(champ, erreur)
{
   if(erreur)
      champ.style.borderColor = "#ff1a1a";
   else
      champ.style.borderColor = "";
}

function verifForm(f)
{
   var paswdOk = verifPassword(f.password);
   var mailOk = verifMail(f.email);
   //var countryOk = verifCountry(f.country);
   var nameOk = verifName(f.displayName);
   
   if(paswdOk && mailOk && nameOk)
      return true;
   else
   {
      alert("Veuillez remplir correctement tous les champs");
      return false;
   }
}

//===================verif email=========================

function verifMail(champ)
{
   var regex = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
   if(!regex.test(champ.value))
   {
      surligne(champ, true);
      return false;
      alert("Veuillez remplir correctement le champs email !");
   }
   else
   {
      surligne(champ, false);
      return true;
   }
}

//===================verif name=========================

function verifName(champ)
{
   if(champ.value.length < 2 || champ.value.length > 25)
   {
      surligne(champ, true);
      return false;
   }
   else
   {
      surligne(champ, false);
      return true;
   }
}

//===================verif password=========================

function verifPassword(champ)
{
if(form.champ.value == form.displayName.value) {
    alert("Error: Password must be different from display Name!");
    surligne(champ, true);
    return false;
  }
  re = /[0-9]/;
  if(!re.test(form.champ.value)) {
    alert("Error: password must contain at least one number (0-9)!");
    surligne(champ, true);
    return false;
  }
  re = /[a-z]/;
  if(!re.test(form.champ.value)) {
    alert("Error: password must contain at least one lowercase letter (a-z)!");
    surligne(champ, true);
    return false;
  }
  re = /[A-Z]/;
  if(!re.test(form.champ.value)) {
    alert("Error: password must contain at least one uppercase letter (A-Z)!");
    surligne(champ, true);
    return false;
  }
}
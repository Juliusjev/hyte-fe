import{f as i}from"./fetch-ZdQQvvGr.js";const u=document.getElementById("create_user"),t=document.getElementById("createUserModal"),d=t.querySelector(".close");u.addEventListener("click",()=>{t.style.display="block"});d.addEventListener("click",()=>{t.style.display="none"});window.addEventListener("click",e=>{e.target==t&&(t.style.display="none")});const y=t.querySelector(".createuser"),c=t.querySelector("#create_user_form");y.addEventListener("click",async e=>{e.preventDefault();const n="https://healthdiary.northeurope.cloudapp.azure.com/api/users",l={username:c.querySelector("input[name=username]").value,password:c.querySelector("input[name=password]").value,email:c.querySelector("input[name=email]").value},a={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(l)};try{const s=await i(n,a);console.log(s),alert("Uusi käyttäjä luotu onnistuneesti! Voit nyt kirjautua sisään."),t.style.display="none"}catch(s){console.error(s),alert("Virhe käyttäjää luodessa. Tarkista tiedot ja yritä uudelleen.")}});const m=document.querySelector(".loginuser");m.addEventListener("click",async e=>{e.preventDefault(),console.log("Nyt logataan sisään");const n="https://healthdiary.northeurope.cloudapp.azure.com/api/auth/login",l=document.querySelector("#login_form"),a={username:l.querySelector("input[name=username]").value,password:l.querySelector("input[name=password]").value},s={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)};i(n,s).then(o=>{console.log(o),console.log(o.token),localStorage.setItem("token",o.token),o.token==null?alert("Unauthorized user: käyttäjänimi tai salasana ei täsmää"):(alert("Olet nyt kirjautunut"),localStorage.setItem("username",o.user.username),localStorage.setItem("user_id",o.user.user_id),window.location.href="home.html"),k("loginResponse",`localStorage set with token value: ${o.token}`)})});const r=document.getElementById("loginModal"),p=document.getElementById("login"),g=r.querySelector(".close");p.onclick=function(){r.style.display="block"};g.onclick=function(){r.style.display="none"};window.onclick=function(e){e.target==r&&(r.style.display="none")};function k(e,n){document.getElementById(e).innerText=n}

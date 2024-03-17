import{f as c}from"./fetch-ZdQQvvGr.js";w();const E=document.querySelector(".get_users");E.addEventListener("click",u);let p=[];async function u(){console.log("Haetaan kaikki käyttäjät tietokannasta");const e="https://healthdiary.northeurope.cloudapp.azure.com/api/users",n={method:"GET",headers:{Authorization:"Bearer: "+localStorage.getItem("token")}};c(e,n).then(t=>{p=t,y(t)})}function y(e){console.log(e);const a=document.querySelector(".tbody");a.innerHTML="",e.forEach(t=>{const o=document.createElement("tr");o.appendChild(l(t.username)),o.appendChild(l(t.email)),o.appendChild(l(t.user_level)),t.user_id.toString()===localStorage.getItem("user_id")?(o.appendChild(g(t.user_id,"Muokkaa")),o.appendChild(k(t.user_id,"Poista"))):(o.appendChild(l("")),o.appendChild(l(""))),o.appendChild(l(t.user_id)),a.appendChild(o)});const n=document.getElementById("tableContainer");f(n),n.appendChild(C()),n.appendChild(B()),n.style.display="block"}function l(e){const a=document.createElement("td");return a.innerText=e,a}function g(e,a,n){const t=document.createElement("button");t.className="mod",t.setAttribute("data-id",e),t.innerText=a,t.addEventListener("click",b);const o=document.createElement("td");return o.appendChild(t),o}function k(e,a,n){const t=document.createElement("button");t.className="del",t.setAttribute("data-id",e),t.innerText=a,t.addEventListener("click",v);const o=document.createElement("td");return o.appendChild(t),o}function f(e){e.querySelectorAll(".tableButton").forEach(n=>n.remove())}function C(){const e=document.createElement("button");return e.innerText="Päivitä taulukko",e.className="tableButton",e.addEventListener("click",u),e}function B(){const e=document.createElement("button");return e.innerText="Sulje taulukko",e.className="tableButton",e.addEventListener("click",()=>{document.getElementById("tableContainer").style.display="none"}),e}function b(e){e.preventDefault();const a=e.target.getAttribute("data-id"),n=p.find(t=>t.user_id.toString()===a);n?(document.getElementById("newUsername").value=n.username||"",document.getElementById("newPassword").value="",document.getElementById("newEmail").value=n.email||"",document.getElementById("editUserForm").style.display="block"):console.error("Käyttäjää ei löydy.")}document.querySelector("#editUser");document.querySelector("#editUserForm").addEventListener("submit",T);function T(e){e.preventDefault(),console.log("Päivitetään käyttäjätietoja");const a=document.getElementById("newUsername").value,n=document.getElementById("newPassword").value,t=document.getElementById("newEmail").value,o=localStorage.getItem("token"),i="https://healthdiary.northeurope.cloudapp.azure.com/api/users",r={method:"PUT",headers:{Authorization:"Bearer "+o,"Content-type":"application/json"},body:JSON.stringify({username:a,password:n,email:t})};c(i,r).then(d=>{console.log(d),alert("Käyttäjätietojen päivitys onnistui"),u()})}function v(e){console.log(e);const a=e.target.attributes["data-id"].value,n=`https://healthdiary.northeurope.cloudapp.azure.com/api/users/${a}`,o={method:"DELETE",headers:{Authorization:"Bearer "+localStorage.getItem("token")}};confirm(`Haluatko varmasti poistaa käyttäjän ID: ${a}? 
  HUOM! Sinut kirjataan ulos!`)&&c(n,o).then(r=>{if(Object.keys(r).length===0)throw new Error("401 Unauthorized");alert("Käyttäjä poistettu onnistuneesti"),h()}).catch(r=>{alert(`Virhe käyttäjän poistossae: ${r.message}`)})}function w(){c("https://healthdiary.northeurope.cloudapp.azure.com/api/entries/top",{method:"GET"}).then(n=>{I(n)})}function I(e){console.log(e);const a=document.querySelector(".topbody");a.innerHTML="",e.forEach((n,t)=>{const o=document.createElement("tr"),i=document.createElement("td");i.innerText=n.username;const r=document.createElement("td");r.innerText=n.DiaryEntriesCount;const d=document.createElement("td");d.innerText=n.ExercisesCount;const m=document.createElement("td");m.innerText=n.TotalEntries;const s=document.createElement("td");t===0?s.innerText="🥇":t===1?s.innerText="🥈":t===2?s.innerText="🥉":s.innerText="",o.appendChild(i),o.appendChild(r),o.appendChild(d),o.appendChild(m),o.appendChild(s),a.appendChild(o)})}function S(){console.log("Hei, täällä ollaan!");const e="https://healthdiary.northeurope.cloudapp.azure.com/api/auth/me",n={method:"GET",headers:{Authorization:"Bearer: "+localStorage.getItem("token")}};c(e,n).then(t=>{console.log(t),document.getElementById("name").innerHTML=t.user.username})}S();document.getElementById("logout").addEventListener("click",h);function h(){confirm("Haluatko varmasti kirjautua ulos?")&&(alert("Kirjauduttu ulos onnistuneesti! "),localStorage.removeItem("token"),localStorage.removeItem("username"),window.location.href="index.html")}

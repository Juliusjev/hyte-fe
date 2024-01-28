'use strict'

document.getElementById("language").innerHTML = "Selaimen kieli: " + navigator.language;

document.getElementById("browser").innerHTML = "Näytön koko: " + screen.availWidth + "x" + screen.availHeight;

document.getElementById("size").innerHTML = "Selaimen ikkunan koko: " + window.innerWidth + "x" + window.innerHeight;


function displayDateTime() {
    const now = new Date();
    const options = {
        day: 'numeric', 
        month: 'long', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false
    };
    return now.toLocaleString('fi-FI', options);
}

let time = displayDateTime();

document.getElementById("time").innerHTML = "Päivämäärä ja aika: " + time;

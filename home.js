import './style.css';
import { fetchData } from './fetch.js';


// Käyttäjän uloskirjautuminen
document.getElementById('logout').addEventListener('click', function() {
  const answer = confirm('Haluatko varmasti kirjautua ulos?')
  if (answer) {
      // Poistaa tokenin local storagesta
    alert('Kirjauduttu ulos onnistuneesti! ')
    localStorage.removeItem('token');
    localStorage.removeItem('username');

    // Siirtää käyttäjän index.html-sivulle
    window.location.href = 'index.html';
    }
});

// Haetaan käyttäjän nimi tervehtimistä varten
function showUsername() {
  const url = 'http://127.0.0.1:3000/api/auth/me';
  let token = localStorage.getItem('token');
  const options = {
    method: 'GET',
    headers: {
      Authorization : 'Bearer: ' + token,
    },
  }
  fetchData(url, options).then((data) => {
    console.log(data);
    document.getElementById('name').innerHTML = data.user.username;
  });
}

showUsername(); 

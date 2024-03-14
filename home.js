import './style.css';
import { fetchData } from './fetch.js';

const bt1 = document.querySelector('.get_entry');
bt1.addEventListener('click', async () => {
  console.log('Klikki toimii');
  const url = 'http://localhost:3000/api/entries/1';

  fetchData(url).then((data) => {
    // käsitellään fetchData funktiosta tullut JSON
    console.log(data);

  });



  // Get entries by id
  // GET http://localhost:3000/api/entries/:id



});

const usersButton = document.querySelector('.get_users');
usersButton.addEventListener('click', getUsers);

async function getUsers() {
  console.log('Haetaan kaikki käyttäjät tietokannasta')
  const url = 'http://127.0.0.1:3000/api/users';
  let token = localStorage.getItem('token');
  const options = {
    method: 'GET',
    headers: {
      Authorization : 'Bearer: ' + token,
    },
  };

  fetchData(url, options).then((data) => {
    createTable(data);
  });
}

function createTable(data) {
  console.log(data);

  // etsitään tbody -elementti
  const tbody = document.querySelector('.tbody');
  tbody.innerHTML = '';


// luodaan jokaiselle tietoriville oikeat elementit
// elementtien sisään pistetään oikeat tiedot
  data.forEach(user => {
    console.log(
      user.username, user.user_id, user.user_level);

    // Luodaan jokaiselle riville ensin TR elementti 
    const tr = document.createElement('tr');

    // Luodaan soluja
    const td1 = document.createElement('td');
    td1.innerText = user.username;

    const td2 = document.createElement('td');
    td2.innerText = user.user_level;

    const td3 = document.createElement('td');
    // Kaksi eri tapaa tehdä (yhden rivin taktiikka (parempi staattiselle datalle), tai monen rivin taktiikka)
    // td3.innerHTML = `<button class="check" data-id="${user.user_id}"> Info </button>`;
    const button1 = document.createElement('button');
    button1.className = 'check';
    button1.setAttribute('data-id', user.user_id);
    button1.innerText = 'Info';
    td3.appendChild(button1);

    button1.addEventListener('click', getUser)


    const td4 = document.createElement('td');
    const button2 = document.createElement('button');
    button2.className = 'del';
    button2.setAttribute('data-id', user.user_id);
    button2.innerText = 'Delete';
    td4.appendChild(button2);

    button2.addEventListener('click', deleteUser)

    const td5 = document.createElement('td');
    td5.innerText = user.user_id;

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tbody.appendChild(tr);
  });
}

function getUser() {
  console.log('Klikkasit riviä!')
};

function deleteUser(evt) {
  console.log('Poistit käyttäjän')
  console.log(evt);

  // Tapa 1, haetaan arvo tutkimalla eventtiä
  const id = evt.target.attributes['data-id'].value;
  console.log('Ensimmäinen tapa', id);

  // Tapa 2, haetaan "viereinen elementti" 
  const id2 = evt.target.parentElement.nextElementSibling.textContent;
  console.log('Toinen tapa: ', id2);

  const url = `http://127.0.0.1:3000/api/users/${id}`;
  let token = localStorage.getItem('token');
  const options = {
    method: 'DELETE',
    headers: {
      Authorization : 'Bearer: ' + token,
    },
  };

  //Varmistetaan käyttäjän poisto
  const answer = confirm(`Haluatko varmasti poistaa käyttäjän ID: ${id}`)
  if (answer) {
    fetchData(url, options).then((data) => {
      console.log(data);
      getUsers();
    });
  }
}



function showUsername() {
  console.log('Hei, täällä ollaan!');
  // Vaihtoehto 1: localStorageen tallennettu 'username' haetaan ja esitetään käyttäjälle
  // let name = localStorage.getItem('username');
  // console.log('Nimesi on: ', name)
  // document.getElementById('name').innerHTML = name;

  // Vaihtoehto 2: käytetään tokenia ja haetaan tietokannasta (/api/auth/me polku) käyttäjän tiedot
  const url = 'http://localhost:3000/api/auth/me';
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





// 1. testataan ensin YKSI endpoint joka ei vaadi tokenia
// 2. uudelleen strukturoidaan koodi jotta se on modulaarisempi

// tämä toimi ennen autentikaatiota, nyt tarvitsee tokenin, siistitään pian!
// sivuille on nyt myös lisätty navigaatio html sivuun, sekä siihen sopiva CSS koodi, hae siis uusi HTML ja UUSI CSS ennen kun aloitat

async function getAllUsers() {
  console.log('toimii!');

  try {
    const response = await fetch('http://127.0.0.1:3000/api/users');
    console.log(response);
    const data = await response.json();
    console.log(data);

    data.forEach((element) => {
      console.log(element.username);
    });

    // tänne tiedot
    const tbody = document.querySelector('.tbody');
    tbody.innerHTML = '';

    data.forEach((element) => {
      console.log(element.username);

      // Create table row element
      var tr = document.createElement('tr');

      // td1 Username
      var td1 = document.createElement('td');
      td1.innerText = element.username;

      // td2
      var td2 = document.createElement('td');
      td2.innerText = element.user_level;

      // td3
      var td3 = document.createElement('td');
      var button1 = document.createElement('button');
      button1.className = 'check';
      button1.setAttribute('data-id', '1');
      button1.innerText = 'Info';
      td3.appendChild(button1);

      // td4
      var td4 = document.createElement('td');
      var button2 = document.createElement('button');
      button2.className = 'del';
      button2.setAttribute('data-id', '1');
      button2.innerText = 'Delete';
      td4.appendChild(button2);

      // td5
      var td5 = document.createElement('td');
      td5.innerText = element.user_id;

      // Append table data elements to the table row element
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      tr.appendChild(td5);

      // Append the table row element to the table (assuming you have a table with the id 'myTable')
      tbody.appendChild(tr);
    });
  } catch (error) {
    console.log(error);
  }
}

document.getElementById('logout').addEventListener('click', function() {
  // Poistaa tokenin local storagesta
  alert('Kirjauduttu ulos onnistuneesti! ')
  localStorage.removeItem('token');
  localStorage.removeItem('username');

  // Siirtää käyttäjän index.html-sivulle
  window.location.href = 'index.html';
});

import './style.css';
import { fetchData } from './fetch.js';

// Haetaan nappi, joka avaa käyttäjän luomis-modalin
const openCreateUserModal = document.getElementById('create_user');
const createUserModal = document.getElementById('createUserModal');
const closeCreateUser = createUserModal.querySelector('.close');

// Kun käyttäjä klikkaa "Luo käyttäjä" -linkkiä, modal avautuu
openCreateUserModal.addEventListener('click', () => {
  createUserModal.style.display = 'block';
});

// Kun käyttäjä klikkaa sulje ("x") -painiketta, modal sulkeutuu
closeCreateUser.addEventListener('click', () => {
  createUserModal.style.display = 'none';
});

// Kun käyttäjä klikkaa modalin ulkopuolelle, modal sulkeutuu
window.addEventListener('click', (event) => {
  if (event.target == createUserModal) {
    createUserModal.style.display = 'none';
  }
});

// Haetaan nappi ja lomake käyttäjän luomiseen modalista
const createUser = createUserModal.querySelector('.createuser');
const createUserForm = createUserModal.querySelector('#create_user_form');

createUser.addEventListener('click', async (evt) => {
  evt.preventDefault();
  const url = 'http://127.0.0.1:3000/api/users';

  const data = {
    username: createUserForm.querySelector('input[name=username]').value,
    password: createUserForm.querySelector('input[name=password]').value,
    email: createUserForm.querySelector('input[name=email]').value,
  };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  try {
    const responseData = await fetchData(url, options);
    console.log(responseData);
    alert('Uusi käyttäjä luotu onnistuneesti! Voit nyt kirjautua sisään.');
    createUserModal.style.display = 'none';
  } catch (error) {
    console.error(error);
    alert('Virhe käyttäjää luodessa. Tarkista tiedot ja yritä uudelleen.');
  }
});


// haetaan nappi josta haetaan formi ja logataan sisään
// tästä saadaan TOKEN
const loginUser = document.querySelector('.loginuser');

loginUser.addEventListener('click', async (evt) => {
  evt.preventDefault();
  console.log('Nyt logataan sisään');

  const url = 'http://127.0.0.1:3000/api/auth/login'
  const form = document.querySelector('#login_form');

  const data = {
    "username": form.querySelector('input[name=username]').value,
    "password": form.querySelector('input[name=password]').value,
  };

  const options = {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  }
  
  fetchData(url, options).then((data) => {
    console.log(data);
    console.log(data.token);

    // asetetaan token local storageen nimellä "token", löytyy application-välilehdeltä
    localStorage.setItem('token', data.token);

    // Tässä oikeasti kannattaa tehdä niin, että fetch.js ottaa validointivirheen joka käsitellään
    if (data.token == undefined) {
      alert('Unauthorized user: käyttäjänimi tai salasana ei täsmää');
    } else {
      alert('Olet nyt kirjautunut');
      localStorage.setItem('username', data.user.username);
      localStorage.setItem('user_id', data.user.user_id);
      window.location.href = 'home.html';
    }

    logResponse('loginResponse', `localStorage set with token value: ${data.token}`);

  });
});

// Haetaan modal
const loginModal = document.getElementById('loginModal');

// Haetaan linkki, joka avaa modalin
const loginLink = document.getElementById('login');

// Haetaan <span> elementti, joka sulkee modalin
const closeLoginBtn = loginModal.querySelector('.close');

// Kun käyttäjä klikkaa linkkiä, modal avautuu
loginLink.onclick = function() {
  loginModal.style.display = "block";
}

// Kun käyttäjä klikkaa "x", modal sulkeutuu
closeLoginBtn.onclick = function() {
  loginModal.style.display = "none";
}

// Kun käyttäjä klikkaa modalin ulkopuolelle, se sulkeutuu
window.onclick = function(event) {
  if (event.target == loginModal) {
    loginModal.style.display = "none";
  }
}
// Haetaan nappi josta tyhjennetään localStorage
// const clear = document.querySelector('#clearButton');
// clear.addEventListener('click', clearLocalStorage);

// Apufunktio, kirjoittaa halutin koodiblokin sisään halutun tekstin
function logResponse(codeblock, text) {
  document.getElementById(codeblock).innerText = text;
}


// // Haetaan nappi josta testataan TOKENIN käyttöä, /auth/me
// // const meRequest = document.querySelector('#meRequest');
// // meRequest.addEventListener('click', async () => {
// //   console.log('Testataan TOKENIA ja haetaan käyttäjän tiedot');

//   // # Get user info by token (requires token)
//   //       GET http://localhost:3000/api/auth/me
//   //       Authorization: Bearer (put-user-token-here)

//   const url = 'http://localhost:3000/api/auth/me';
//   const token = localStorage.getItem('token');
//   console.log('Aktiivinen token: ', token);

//   const options = {
//     method: "GET", // *GET, POST, PUT, DELETE, etc.
//     headers: {
//       Authorization: 'Bearer: ' + token,
//     },
//   };

//   console.log(options);
  
//   fetchData(url, options).then((data) => {
//   console.log(data);
//   logResponse('meResponse', `Authorized user info: ${JSON.stringify(data)}`);
//   });

// });



// Apufunktio, Tyhjennä local storage
function clearLocalStorage() {
  localStorage.removeItem('token');
  logResponse('clearResponse', 'localStorage cleared!');
}




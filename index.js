import './style.css';
import { fetchData } from './fetch.js';


// Luodaan modalit
const loginModal = document.getElementById('loginModal');
const createUserModal = document.getElementById('createUserModal');

// Haetaan modaleille napit
const openLoginModal = document.getElementById('login');
const openCreateUserModal = document.getElementById('create_user');

// Haetaan modaleille sulkemisnapit
const closeLoginModal = loginModal.querySelector('.close');
const closeCreateUser = createUserModal.querySelector('.close');

// Modaleiden avaus
openLoginModal.addEventListener('click', () => {
  loginModal.style.display = 'block';
});

openCreateUserModal.addEventListener('click', () => {
  createUserModal.style.display = 'block';
});

// Modaleiden sulku napista
closeLoginModal.addEventListener('click', () => {
  loginModal.style.display = 'none';
});

closeCreateUser.addEventListener('click', () => {
  createUserModal.style.display = 'none';
});


// Modaleiden sulku ikkunasta ulosklikkaamalla
window.addEventListener('click', (event) => {
  if (event.target === loginModal) {
    loginModal.style.display = 'none';
  }
});

window.addEventListener('click', (event) => {
  if (event.target === createUserModal) {
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


// Haetaan nappi ja lomake käyttäjän kirjautumiseen modalista
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
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), 
  }
  try {
    const response = await fetch(url, options);
    const responseData = await response.json();

    if (!response.ok) {
      // Jos vastauksen status-koodi ei ole OK, heitetään virhe
      throw new Error(responseData.message || 'Unauthorized user: käyttäjänimi tai salasana ei täsmää');
    }

    console.log(responseData);
    localStorage.setItem('token', responseData.token);
    localStorage.setItem('username', responseData.user.username);
    localStorage.setItem('user_id', responseData.user.user_id);
    alert('Olet nyt kirjautunut');
    window.location.href = 'home.html';
  } catch (error) {
    console.error('Login error:', error);
    alert(error.message);
  }
});









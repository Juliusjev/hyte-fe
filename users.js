import './style.css';
import { fetchData } from './fetch.js';


// Haetaan top5-aktiivisinta käyttäjää kun sivu latautuu
fetchTop5();


// Haetaan nappi käyttäjien hakua varten
const usersButton = document.querySelector('.get_users');
usersButton.addEventListener('click', getUsers);

let allUsers = [];



// Funktio kaikkien käyttäjien haulle
async function getUsers() {
  console.log('Haetaan kaikki käyttäjät tietokannasta')
  const url = 'https://healthdiary.northeurope.cloudapp.azure.com/api/users';
  let token = localStorage.getItem('token');
  const options = {
    method: 'GET',
    headers: {
      Authorization : 'Bearer: ' + token,
    },
  };

  fetchData(url, options).then((data) => {
    allUsers = data;
    createUserTable(data);
  });
}
// Luodaan taulukko kaikista käyttäjätiedoista

function createUserTable(data) {
  console.log(data);
  
  // etsitään tbody -elementti
  const tbody = document.querySelector('.tbody');
  tbody.innerHTML = '';

  // Luodaan jokaiselle tietoriville oikeat elementit
  data.forEach(user => {
    const tr = document.createElement('tr');
    // Luodaan ja lisätään solut ja niiden sisältö...
    tr.appendChild(createCell(user.username));
    tr.appendChild(createCell(user.email));
    tr.appendChild(createCell(user.user_level));
    if (user.user_id.toString() === localStorage.getItem('user_id')) {
      tr.appendChild(editButtonCell(user.user_id, 'Muokkaa', openEditUser));
      tr.appendChild(deleteButtonCell(user.user_id, 'Poista', deleteUser));
    } else {
      tr.appendChild(createCell(''));
      tr.appendChild(createCell(''));
    }
    
    tr.appendChild(createCell(user.user_id));
    tbody.appendChild(tr);
  });
}



// Apufunktiot solujen ja painikkeiden luomiseen
function createCell(text) {
  const td = document.createElement('td');
  td.innerText = text;
  return td;
}

function editButtonCell(id, text, onClickFunction) {
  const button = document.createElement('button');
  button.className = 'mod';
  button.setAttribute('data-id', id);
  button.innerText = text;
  button.addEventListener('click', openEditUser);
  const td = document.createElement('td');
  td.appendChild(button);
  return td;
}

function deleteButtonCell(id, text, onClickFunction) {
  const button = document.createElement('button');
  button.className = 'del';
  button.setAttribute('data-id', id);
  button.innerText = text;
  button.addEventListener('click', deleteUser);
  const td = document.createElement('td');
  td.appendChild(button);
  return td;
};



// Avataan editUserForm
function openEditUser(evt) {
  evt.preventDefault();
  const userId = evt.target.getAttribute('data-id');

  const user = allUsers.find(u => u.user_id.toString() === userId);

  if (user) {
    document.getElementById('newUsername').value = user.username || '';
    document.getElementById('newPassword').value = '';
    document.getElementById('newEmail').value = user.email || '';
    
    document.getElementById('editUserForm').style.display ='block';
  } else {
    console.error('Käyttäjää ei löydy.');
  }

};



// Haetaan nappi joka kutsuu updateUser funktiota
const editUserBtn = document.querySelector('#editUser');
document.querySelector('#editUserForm').addEventListener('submit', updateUser)




// Käyttäjätietojen päivitys
function updateUser(evt) {
  evt.preventDefault();
  console.log('Päivitetään käyttäjätietoja')
  const newUsername = document.getElementById('newUsername').value;
  const newPassword = document.getElementById('newPassword').value;
  const newEmail = document.getElementById('newEmail').value;
  const token = localStorage.getItem('token');

  const url = "https://healthdiary.northeurope.cloudapp.azure.com/api/users"
  const options = {
    method: 'PUT',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      username: newUsername,
      password: newPassword,
      email: newEmail
    }),
  };

  fetchData(url, options).then((data) => {
    console.log(data);
    alert('Käyttäjätietojen päivitys onnistui')
    document.getElementById('newUsername').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('newEmail').value = '';
    getUsers();
  })

}


// Käyttäjän poisto
function deleteUser(evt) {
  console.log(evt);

  // Tapa 1, haetaan arvo tutkimalla eventtiä
  const id = evt.target.attributes['data-id'].value;


  const url = `https://healthdiary.northeurope.cloudapp.azure.com/api/users/${id}`;
  let token = localStorage.getItem('token');
  const options = {
    method: 'DELETE',
    headers: {
      Authorization : 'Bearer ' + token,
    },
  };



  //Varmistetaan käyttäjän poisto
  const answer = confirm(`Haluatko varmasti poistaa käyttäjän ID: ${id}? 
  HUOM! Sinut kirjataan ulos!`)
  if (answer) {
    fetchData(url, options).then((data) => {
      if (Object.keys(data).length === 0) {
        throw new Error('401 Unauthorized')
      }
      alert('Käyttäjä poistettu onnistuneesti')
      logOut();
    }).catch((error) => {
      alert(`Virhe käyttäjän poistossae: ${error.message}`);
    });
  }
};



// Haetaan top5-aktiivisinta käyttäjää
function fetchTop5() {
  const url = 'https://healthdiary.northeurope.cloudapp.azure.com/api/entries/top'; 
  const options = {
    method: 'GET',
  };

  fetchData(url, options).then((data) => {
    createTop5Table(data);
  });
};


// Luodaan taukukko top5-käyttäjistä
function createTop5Table(data) {
  console.log(data);

  const tbody = document.querySelector('.topbody');
  tbody.innerHTML = '';

  data.forEach((user, index) => {
    const tr = document.createElement('tr');

    const td1 = document.createElement('td');
    td1.innerText = user.username;

    const td2 = document.createElement('td');
    td2.innerText = user.DiaryEntriesCount;

    const td3 = document.createElement('td');
    td3.innerText = user.ExercisesCount;

    const td4 = document.createElement('td');
    td4.innerText = user.TotalEntries;

    const td5 = document.createElement('td');
    if (index === 0) { 
      td5.innerText = '🥇';
    } else if (index === 1) {
      td5.innerText = '🥈';
    } else if (index === 2) {
      td5.innerText = '🥉';
    } else { 
      td5.innerText = '';
    }

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tbody.appendChild(tr);

  });
}



// Haetaan käyttäjän nimi tervehtimistä varten
function showUsername() {
  console.log('Hei, täällä ollaan!');
  const url = 'https://healthdiary.northeurope.cloudapp.azure.com/api/auth/me';
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


// Uloskirjautuminen
document.getElementById('logout').addEventListener('click', logOut) 

function logOut(){
    const answer = confirm('Haluatko varmasti kirjautua ulos?')
    if (answer) {
        // Poistaa tokenin local storagesta
      alert('Kirjauduttu ulos onnistuneesti! ')
      localStorage.removeItem('token');
      localStorage.removeItem('username');
  
      // Siirtää käyttäjän index.html-sivulle
      window.location.href = 'index.html';
      }
};

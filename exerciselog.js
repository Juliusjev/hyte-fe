import './style.css';
import { fetchData } from './fetch.js';

showUsername(); 
document.addEventListener('DOMContentLoaded', function() {
    getExercisesById();
});

// Haetaan kirjautuneen käyttäjän harjoittelutiedot
async function getExercisesById() {
  console.log('Haetaan kaikki käyttäjän harjoitukset tietokannasta')
  const user_id = localStorage.getItem('user_id');
  const url = `https://healthdiary.northeurope.cloudapp.azure.com/api/exercises/${user_id}`;
  let token = localStorage.getItem('token');
  const options = {
    method: 'GET',
    headers: {
      Authorization : 'Bearer: ' + token,
    },
  };

  fetchData(url, options).then((data) => {
    console.log('Tässä data:', data)
    // Annetaan data createTable -funktion käsiteltäväksi
    createTable(data);

  });
}



// Luodaan taulukko getExerciseById:sta saadulla datalla
function createTable(data) {

  const tbody = document.querySelector('.tbody');
  tbody.innerHTML = '';

  const modal = document.getElementById("editExerciseModal");

// Käännetään datan järjestys
// Saadaan uusimmat merkinnät ensin
  const reversedData = data.reverse();

// luodaan jokaiselle tietoriville oikeat elementit
// elementtien sisään pistetään oikeat tiedot
  reversedData.forEach((element) => {

    // Luodaan jokaiselle riville ensin TR elementti 
    const tr = document.createElement('tr');
    
    const formattedDate = new Date(element.date).toLocaleDateString(
        "fi-Fi"
    );
    // Luodaan soluja
    const td1 = document.createElement('td');
    td1.innerText = formattedDate;

    const td2 = document.createElement('td');
    td2.innerText = element.type;

    const td3 = document.createElement('td');
    if (element.intensity === 'High') {
      td3.innerText = 'Kova';
    } else if (element.intensity === 'Medium') {
      td3.innerText = 'Keskiverto';
    } else if (element.intensity === 'Low') {
      td3.innerText = 'Matala';
    } 

    const td5 = document.createElement('td');
    const hours = Math.floor(element.duration / 60);
    const minutes = element.duration % 60;
    
    if (hours > 0) {
      td5.innerText = `${hours} t ${minutes} min`;
    } else {
      td5.innerText = `${minutes} min`;
    }

    const td6 = document.createElement('td');
    const button1 = document.createElement('button');
    button1.className = 'del';
    button1.setAttribute('data-id', element.exercise_id);
    button1.innerText = 'Poista merkintä';
    button1.addEventListener('click', deleteExercise);
    td6.appendChild(button1);

    const td7 = document.createElement('td');
    const button2 = document.createElement('button');
    button2.className = 'mod';
    button2.setAttribute('data-id', element.exercise_id);
    button2.innerText = 'Muokkaa';
    button2.addEventListener('click', () => showModal(element));
    td7.appendChild(button2);



    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td5);
    tr.appendChild(td7);
    tr.appendChild(td6);
    tbody.appendChild(tr);
  });

  // Haetaan <span> elementti, joka sulkee modalin
const closeBtn = document.querySelector('.close');

closeBtn.addEventListener('click', () => {
  modal.style.display = "none";
})

// Kun käyttäjä klikkaa modalin ulkopuolelle, se sulkeutuu
window.onclick = function(event) {
  if (event.target == modal) {
      modal.style.display = "none";
  }
}

}

// Kun käyttäjä klikkaa "muokkaa", avataan Modal
function showModal(element) {
    document.getElementById('editDate').value = new Date(element.date).toISOString().split('T')[0]; 
    document.getElementById('editActivity').value = element.type;
    document.getElementById('editIntensity').value = element.intensity;
    const hours = Math.floor(element.duration / 60).toString().padStart(2, '0');
    const minutes = (element.duration % 60).toString().padStart(2, '0');
    document.getElementById('editDuration').value = `${hours}:${minutes}`;
    document.getElementById('exerciseId').value = element.exercise_id; 
    const form = document.getElementById('editExerciseForm');
    form.addEventListener('submit', updateExercise)
    const modal = document.getElementById("editExerciseModal");
    modal.style.display = "block";
}


document.getElementById('exerciseForm').addEventListener('submit', createExercise);



// Funktio uuden harjoituksen lisäämiselle
function createExercise(evt) {
  evt.preventDefault();
  console.log(evt)

  const url = `https://healthdiary.northeurope.cloudapp.azure.com/api/exercises/`;
  let token = localStorage.getItem('token');

  const newDuration = document.getElementById('setDuration').value;
  const [tunnit, minuutit] = newDuration.split(':').map(Number);
  const durationMin = tunnit * 60 + minuutit;

  const exerciseBody = {
    type: document.getElementById('setActivity').value,
    duration: durationMin,
    intensity: document.getElementById('setIntensity').value,
    date: document.getElementById('setDate').value
  };
  
  console.log(exerciseBody);

  const options = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(exerciseBody),
  };

  fetchData(url, options).then((data) => {
    console.log(data);
    alert('Harjoitus lisätty onnistuneesti!');
    document.getElementById('setActivity').value = '';
    document.getElementById('setIntensity').value = '';
    document.getElementById('setDuration').value = '';
    document.getElementById('setDate').value = '';
    getExercisesById();
  })
}

// Funktio harjoituksen poistamiseksi
function deleteExercise(evt) {
  const exercise_id = evt.target.attributes['data-id'].value;
  const url = `https://healthdiary.northeurope.cloudapp.azure.com/api/exercises/${exercise_id}`;
  let token = localStorage.getItem('token');
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer: ' + token,
    },
  };

  const answer =  confirm('Haluatko varmasti poistaa harjoituksen?');
  if (answer) {
    console.log('Poisto onnistunut');
    fetchData(url, options).then((data) => {
      console.log(data);
      getExercisesById();
    });
  }
}
    

// Funktio harjoituksen päivittämiseksi
function updateExercise(evt) {
  evt.preventDefault();
  console.log('Päivitetään harjoitus');

  const user_id = localStorage.getItem('username');
  const exercise_id = document.getElementById('exerciseId').value;

  const url = `https://healthdiary.northeurope.cloudapp.azure.com/api/exercises/${exercise_id}`;
  let token = localStorage.getItem('token');

  const editDuration = document.getElementById('editDuration').value;
  const [tunnit, minuutit] = editDuration.split(':').map(Number);
  const durationMin = tunnit * 60 + minuutit;
  

  const editExerciseBody = {
    user_id: user_id,
    type: document.getElementById('editActivity').value,
    duration: durationMin,
    intensity: document.getElementById('editIntensity').value,
    date: document.getElementById('editDate').value
  }
  const options = {
    method: 'PUT',
    headers: {
      Authorization: 'Bearer: ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(editExerciseBody),
  };
  fetchData(url, options).then((data) => {
    console.log(data);
    alert('Harjoituksen päivitys onnistui!')
    const modal = document.getElementById('editExerciseModal');
    modal.style.display = "none";
    getExercisesById();
  })
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
    document.getElementById('name').innerHTML = data.user.username;
  });
}


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


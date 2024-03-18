import './style.css';
import { fetchData } from './fetch.js';



// Haetaan kirjautuneen käyttäjän merkinnät
async function getEntryById() {
  console.log('Haetaan kaikki käyttäjän merkinnät tietokannasta')
  const user_id = localStorage.getItem('user_id');
  const url = `https://healthdiary.northeurope.cloudapp.azure.com/api/entries/${user_id}`;
  let token = localStorage.getItem('token');
  const options = {
    method: 'GET',
    headers: {
      Authorization : 'Bearer: ' + token,
    },
  };

  fetchData(url, options).then((data) => {
    //Annetaan data createTable-funktion käsiteltäväksi
    createTable(data);
  });
}


// Luodaan taulukko getEntryById:n datalla
function createTable(data) {

  // etsitään tbody -elementti
  const tbody = document.querySelector('.tbody');
  tbody.innerHTML = '';

  const modal = document.getElementById("editEntryModal");

  // Käännetään datan järjestys ja 
  // puretaan se loogisemmassa järjestyksessä
  const reversedData = data.reverse();

// luodaan jokaiselle tietoriville oikeat elementit
// elementtien sisään pistetään oikeat tiedot
  reversedData.forEach((element) => {

    // Luodaan jokaiselle riville ensin TR elementti 
    const tr = document.createElement('tr');
    
    const formattedDate = new Date(element.entry_date).toLocaleDateString(
        "fi-Fi"
    );
    // Luodaan soluja
    const td1 = document.createElement('td');
    td1.innerText = formattedDate;

    const td2 = document.createElement('td');
    td2.innerText = element.mood;

    const td3 = document.createElement('td');
    td3.innerText = element.weight;

    const td4 = document.createElement('td');
    td4.innerText = element.sleep_hours;

    const td5 = document.createElement('td');
    td5.innerText = element.notes;

    const td6 = document.createElement('td');
    const button1 = document.createElement('button');
    button1.className = 'del';
    button1.setAttribute('data-id', element.entry_id);
    button1.innerText = 'Poista merkintä';
    button1.addEventListener('click', deleteEntry);
    td6.appendChild(button1);

    const td7 = document.createElement('td');
    const button2 = document.createElement('button');
    button2.className = 'mod';
    button2.setAttribute('data-id', element.entry_id);
    button2.innerText = 'Muokkaa';
    button2.addEventListener('click', () => showModal(element));
    td7.appendChild(button2);



    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
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
    document.getElementById('editDate').value = new Date(element.entry_date).toISOString().split('T')[0]; 
    document.getElementById('editMood').value = element.mood;
    document.getElementById('editWeight').value = element.weight;
    document.getElementById('editSleep').value = element.sleep_hours;
    document.getElementById('editEntry').value = element.notes;
    document.getElementById('entryId').value = element.entry_id; 
    const form = document.getElementById('editEntryForm');
    form.addEventListener('submit', updateEntry)
    const modal = document.getElementById("editEntryModal");
    modal.style.display = "block";
}



// Haetaan nappi uuden merkinnän luomiseen
document.getElementById('entryForm').addEventListener('submit', createEntry);


// Funktio joka luo merkinnän 
function createEntry(evt) {
  evt.preventDefault();

  console.log(evt);

  const url = `https://healthdiary.northeurope.cloudapp.azure.com/api/entries/`;
  let token = localStorage.getItem('token');

  const newEntryDate = document.getElementById('setDate').value;
  const newMood = document.getElementById('setMood').value;
  const newWeight = document.getElementById('setWeight').value;
  const newSleep = document.getElementById('setSleep').value;
  const newEntry = document.getElementById('setEntry').value;

  const options = {
      method: 'POST',
      headers: {
          Authorization: 'Bearer ' + token,
          'Content-type': 'application/json',
      },
      body: JSON.stringify({
          entry_date: newEntryDate, 
          mood: newMood, 
          weight: newWeight,
          sleep_hours: newSleep, 
          notes: newEntry}),
  };

  fetchData(url, options).then((data) => {
      console.log(data);
      alert('Merkinnän lisäys onnistunut!');
      document.getElementById('setDate').value = '';
      document.getElementById('setMood').value = '';
      document.getElementById('setWeight').value = '';
      document.getElementById('setSleep').value = '';
      document.getElementById('setEntry').value = '';
      getEntryById();
  });
}


// Merkinnän päivitys
function updateEntry(evt) {
    evt.preventDefault();
    console.log('Päivitetään merkintä');
    console.log(evt);

    const entry_id = document.getElementById('entryId').value;
    const url = `https://healthdiary.northeurope.cloudapp.azure.com/api/entries/${entry_id}`;
    let token = localStorage.getItem('token');

    const newEntryDate = document.getElementById('editDate').value;
    const newMood = document.getElementById('editMood').value;
    const newWeight = parseFloat(document.getElementById('editWeight').value).toFixed(2);
    const newSleep = document.getElementById('editSleep').value;
    const newEntry = document.getElementById('editEntry').value;

    const options = {
        method: 'PUT',
        headers: {
            Authorization: 'Bearer: ' + token,
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            id: entry_id,
            entry_date: newEntryDate, 
            mood: newMood, 
            weight: newWeight,
            sleep_hours: newSleep, 
            notes: newEntry}),
    };

    fetchData(url, options).then((data) => {
        console.log(data);
        alert('Merkinnän päivitys onnistunut!')
        const modal = document.getElementById('editEntryModal');
        modal.style.display ="none";
        getEntryById();
    });
}


// Merkinnän poisto
function deleteEntry(evt) {
    console.log(evt);
    const entry_id = evt.target.attributes['data-id'].value;
    const url = `https://healthdiary.northeurope.cloudapp.azure.com/api/entries/${entry_id}`;
    let token = localStorage.getItem('token');
    const options = {
      method: 'DELETE',
      headers: {
        Authorization : 'Bearer: ' + token,
      },
    };
  
    //Varmistetaan päiväkirjamerkinnän poisto
    const answer = confirm('Haluatko varmasti poistaa merkinnän?')
    if (answer) {
      console.log("Poisto onnistunut")
      fetchData(url, options).then((data) => {
        console.log(data);
        getEntryById();
      });
    }
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


// Uloskirjautuminen
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


showUsername(); 
document.addEventListener('DOMContentLoaded', function() {
    getEntryById();
});

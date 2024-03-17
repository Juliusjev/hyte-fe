function createUserTable(data) {
    console.log(data);
  
    // etsitään tbody -elementti
    const tbody = document.querySelector('.tbody');
    tbody.innerHTML = '';
  
    // luodaan jokaiselle tietoriville oikeat elementit
    data.forEach(user => {
      const tr = document.createElement('tr');
  
      const td1 = document.createElement('td');
      td1.innerText = user.username;
      const td2 = document.createElement('td');
      td2.innerText = user.user_level;
      const td3 = document.createElement('td');
      const button1 = document.createElement('button');
      button1.className = 'check';
      button1.setAttribute('data-id', user.user_id);
      button1.innerText = 'Muokkaa';
      td3.appendChild(button1);
      button1.addEventListener('click', getUser);
  
      const td4 = document.createElement('td');
      const button2 = document.createElement('button');
      button2.className = 'del';
      button2.setAttribute('data-id', user.user_id);
      button2.innerText = 'Poista';
      td4.appendChild(button2);
      button2.addEventListener('click', deleteUser);
  
      const td5 = document.createElement('td');
      td5.innerText = user.user_id;
  
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      tr.appendChild(td5);
      tbody.appendChild(tr);
  
    });
  
  
    // Tämä osa pitäisi sijoittaa forEach-silmukan ulkopuolelle
    const tableContainer = document.getElementById('tableContainer');
  
    removeExistingButtons();
  
    const updateButton = document.createElement('button');
    updateButton.innerText = 'Päivitä taulukko';
    updateButton.className = 'tableButton';
    updateButton.addEventListener('click', getUsers); // Oletetaan, että getUsers on funktio, joka päivittää taulukon
  
    const closeButton = document.createElement('button');
    closeButton.innerText = 'Sulje taulukko';
    closeButton.className = 'tableButton';
    closeButton.addEventListener('click', function() {
      tableContainer.style.display = 'none';
      const usersButton = document.querySelector('.get_users');
      usersButton.addEventListener('click', getUsers);
  
    });
    tableContainer.style.display = 'block';
    tableContainer.appendChild(updateButton);
    tableContainer.appendChild(closeButton);
  }
  
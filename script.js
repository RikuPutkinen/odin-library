let myLibrary = [];

/*let myLibrary = [
  {
    "author": "Orwell",
    "title": "1984",
    "numOfPages": "450",
    "read": "Yes"
  },
  {
    "author": "Peterson",
    "title": "12 Rules For Life",
    "numOfPages": "600",
    "read": "Yes"
  },
  {
    "author": "Greene",
    "title": "Mastery",
    "numOfPages": "429",
    "read": "Yes"
  }
];*/

function Book(author, title, numOfPages, read) {
  this.author = author;
  this.title = title;
  this.numOfPages = numOfPages;
  this.read = read;
}

function addBookToLibrary(author, title, numOfPages, read) {
  let book = new Book(author, title, numOfPages, read);
  myLibrary.push(book);
  displayBooks(myLibrary);
}

function removeBookFromLibrary(index) {
  myLibrary.pop(index);
  console.log(`Removed book at index ${index}`)
  displayBooks(myLibrary);
}

function displayBooks(array) {
  let tbody = document.querySelector('tbody');
  clearTable(tbody);

  array.forEach(element => {
    let row = document.createElement('tr');

    for (let key in element) {
      let cell = document.createElement('td');
      cell.textContent = element[key];
      
      if (key == "read") {
        cell.classList.add('read-status')
        
        let button = document.createElement('button');
        button.setAttribute('type', 'button');
        button.classList.add('toggle-button');
        
        button.textContent = "Toggle";
        cell.appendChild(button);
      }

      row.appendChild(cell);
    }

    let cell = document.createElement('td');
    let removeButton = document.createElement('button');

    removeButton.setAttribute('type', 'button');
    removeButton.classList.add('remove-button', 'right');
    removeButton.textContent = "Remove Book";
    
    cell.appendChild(removeButton);
    row.appendChild(cell);


    let index = array.indexOf(element);
    row.setAttribute('data-index', index.toString());

    tbody.appendChild(row);
  });
  setButtons();
}

function clearTable(tbody) {
  while (tbody.hasChildNodes()) {
    tbody.removeChild(tbody.firstChild);
  }
}


function setButtons() {
  let removeButtons = document.querySelectorAll('.remove-button');

  removeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      let index = Number(button.parentElement.parentElement.attributes["data-index"].value);
      removeBookFromLibrary(index);
    })
  })

  let toggleButtons = document.querySelectorAll('.toggle-button');

  toggleButtons.forEach((button) => {
    button.addEventListener('click', () => {
      let index = Number(button.parentElement.parentElement.attributes["data-index"].value);
      toggleReadStatus(index);
    })
  })
}

function getFormData() {
  let form = document.querySelector('form');
  let formData = new FormData(form);

  let author = formData.get('author');
  let title = formData.get('title');
  let numOfPages = formData.get('pages');
  let read = formData.get('read');
  
  addBookToLibrary(author, title, numOfPages, read);
  form.reset();
}

let addButton = document.querySelector('#add-button');

addButton.addEventListener('click', () => {
  getFormData();
});

function toggleReadStatus(index) {
  if (myLibrary[index]['read'] === "Yes") {
    myLibrary[index]['read'] = "No";
  }
  else {
    myLibrary[index]['read'] = "Yes";
  }

  console.log("Toogled read status");
  displayBooks(myLibrary);
}

let formToggleButtons = document.querySelectorAll('#new-button, #back-button');
let background = document.querySelector('.background');
let formContainer = document.querySelector('.form-container');

formToggleButtons.forEach((button) => {
  button.addEventListener('click', () => {
    background.classList.toggle('hidden');
    formContainer.classList.toggle('hidden');
})
});


displayBooks(myLibrary)
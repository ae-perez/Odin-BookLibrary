const myLibrary = [
  {
    id: 'f7c0b4b2-4f2a-4d4c-9e9e-1b2d3c4e5f61',
    name: 'Brigid Kemmerer',
    bookTitle: 'Defy the Night',
    numOfPages: 496,
    isRead: true,
  },
  {
    id: 'a3d5e6f7-1234-4abc-8def-9876543210aa',
    name: 'Brigid Kemmerer',
    bookTitle: 'Defend the Dawn',
    numOfPages: 448,
    isRead: true,
  },
  {
    id: '9b8c7d6e-5f4a-43b2-9c1d-2e3f4a5b6c7d',
    name: 'Brigid Kemmerer',
    bookTitle: 'Destroy the Day',
    numOfPages: 560,
    isRead: true,
  },
  {
    id: '1a2b3c4d-5e6f-4071-8a9b-bcdef0123456',
    name: 'Callie Hart',
    bookTitle: 'Quicksilver',
    numOfPages: 624,
    isRead: true,
  },
  {
    id: '0f1e2d3c-4b5a-46c7-89d0-1234567890ab',
    name: 'Callie Hart',
    bookTitle: 'Brimstone',
    numOfPages: 672,
    isRead: false,
  },
];

const searchBar = document.getElementById('search-form');
searchBar.addEventListener('submit', searchBookInLibrary);

function Book(name, bookTitle, numOfPages, isRead) {
  this.id = crypto.randomUUID();
  this.name = name;
  this.bookTitle = bookTitle;
  this.numOfPages = numOfPages;
  this.isRead = isRead;
}

function validateTitle(error, input) {
  error.textContent = '';

  if (!input.validity.valid) {
    if (input.validity.valueMissing) {
      error.textContent = 'Please enter a book title.';
    } else if (input.validity.rangeUnderflow) {
      error.textContent =
        'Minimum of 3 characters for a title must be entered.';
    } else if (input.validity.rangeOverflow) {
      error.textContent = 'Maximum of 150 characters for a title is allowed.';
    } else {
      error.textContent = 'Please enter a valid book title.';
    }
  }

  return error.textContent === '';
}

function validateAuthor(error, input) {
  error.textContent = '';

  const fullname = input.value.trim();

  if (!input.validity.valid) {
    if (input.validity.valueMissing) {
      error.textContent = "Please enter the author's name.";
    } else if (input.validity.tooShort) {
      error.textContent =
        "Minimum of 2 characters must be entered for author's name.";
    } else if (input.validity.tooLong) {
      error.textContent =
        "Maximum of 80 characters must be entered for author's name.";
    }
  }

  // custom rule here:
  const parts = fullname.split(/\s+/);
  const first = parts[0];
  const last = parts[1];

  if (parts.length < 2) {
    error.textContent = 'Please enter first and last name.';
  } else if (first.length < 2) {
    error.textContent = 'First name should be at least 2 characters';
  } else if (last.length < 2) {
    error.textContent = 'Last name should be at least 2 characters';
  } else if (first.length > 80) {
    error.textContent = "First name shouldn't be longer than 80 characters";
  } else if (last.length > 80) {
    error.textContent = "Last name shouldn't be longer than 80 characters";
  }

  return error.textContent === '';
}

function validatePages(error, input) {
  error.textContent = '';

  if (!input.validity.valid) {
    if (input.validity.valueMissing) {
      error.textContent = 'Please enter the number of pages.';
    } else if (input.validity.rangeUnderflow) {
      error.textContent = 'Minimum is 10 pages.';
    } else if (input.validity.rangeOverflow) {
      error.textContent = 'Maximum is 7000 pages.';
    } else {
      error.textContent = 'Please enter a valid number of pages.';
    }
  }

  return error.textContent === '';
}

function validateStatus(error, input) {
  error.textContent = '';

  if (!input.validity.valid) {
    if (input.validity.valueMissing) {
      error.textContent = 'Please choose select an option.';
    }
  }

  return error.textContent === '';
}

function clearFormErrors() {
  const errorSpans = document.querySelectorAll('.error');
  errorSpans.forEach((span) => (span.textContent = ''));
}

function addBookToLibrary() {
  const table = document.getElementById('library-table');
  const form = document.getElementById('add-form-container');
  const formData = document.getElementById('add-form');

  formData.reset();
  clearFormErrors();

  table.style.display = 'none';
  form.style.display = 'block';
}

function saveBookToLibrary() {
  const table = document.getElementById('library-table');
  const form = document.getElementById('add-form-container');
  let bookTitle = document.getElementById('book-title').value.trim();
  const titleInput = document.getElementById('book-title');
  const titleError = document.getElementById('titleError');
  let authorName = document.getElementById('author').value.trim(); //will have to fix this after
  const authorInput = document.getElementById('author');
  const authorError = document.getElementById('authorError');

  const numOfPages = document.getElementById('num-of-pages').value.trim();
  const pagesInput = document.getElementById('num-of-pages');
  const pagesError = document.getElementById('pagesError');

  const bookStatus = document.getElementById('book-status').value.trim();
  const statusInput = document.getElementById('book-status');
  const statusError = document.getElementById('statusError');

  // check for errors
  let okTitle = validateTitle(titleError, titleInput);
  let okAuthor = validateAuthor(authorError, authorInput);
  let okPages = validatePages(pagesError, pagesInput);
  let okStatus = validateStatus(statusError, statusInput);

  if (!okTitle || !okAuthor || !okPages || !okStatus) return; // stops function from running if

  bookTitle = bookTitle
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');

  let fullName = authorName
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((word) =>
      word
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join('-'),
    )
    .join(' ');

  // add book to library
  const newBook = new Book(fullName, bookTitle, numOfPages, bookStatus);

  myLibrary.push(newBook);

  form.style.display = 'none';
  table.style.display = 'table';

  displayLibrary();

  table.style.display = 'inline';

  return;
}

function closeForm() {
  const form = document.getElementById('add-form-container');
  const table = document.getElementById('library-table');

  form.style.display = 'none';
  table.style.display = 'table';
}

function delBookFromLibrary() {
  const idToDelete = event.currentTarget.dataset.id;

  const index = myLibrary.findIndex((book) => book.id === idToDelete);
  if (index !== -1) {
    myLibrary.splice(index, 1);
  }

  displayLibrary();
}

function editBookDetails() {
  const idToEdit = event.currentTarget.dataset.id;
  const index = myLibrary.findIndex((book) => book.id === idToEdit);
  if (index !== -1) {
    console.log(`hello`);
    if (myLibrary[index].isRead) {
      myLibrary[index].isRead = false;
    } else {
      myLibrary[index].isRead = true;
    }
  }

  displayLibrary();
}

function searchBookInLibrary() {
  event.preventDefault();

  const value = document
    .getElementById('search-input')
    .value.trim()
    .toLowerCase();

  if (value === '') {
    displayLibrary();
    return;
  }

  const matchingBooks = myLibrary.filter(
    (book) =>
      book.name.toLowerCase().includes(value) ||
      book.bookTitle.toLowerCase().includes(value),
  );

  displayLibrary(matchingBooks);
}

// render array with dummy data to UI
const tableBody = document.querySelector('#library-table tbody');
function displayLibrary(booksToShow = myLibrary) {
  tableBody.innerHTML = '';

  if (!booksToShow.length) {
    const row = document.createElement('tr');
    const cell = document.createElement('td');
    cell.textContent = 'Information not found';
    cell.colSpan = 5; // number of columns in your table
    cell.style.textAlign = 'center';
    row.appendChild(cell);
    tableBody.appendChild(row);
    return;
  }

  booksToShow.forEach((book) => {
    const row = document.createElement('tr');

    const titleCell = document.createElement('td');
    titleCell.textContent = book.bookTitle;

    const authorCell = document.createElement('td');
    authorCell.textContent = book.name;

    const pagesCell = document.createElement('td');
    pagesCell.textContent = book.numOfPages;

    const statusCell = document.createElement('td');
    statusCell.textContent = book.isRead ? 'Read' : 'Not read';

    const modifyCell = document.createElement('td');
    modifyCell.className = 'modify-cell';
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-button';
    deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="#8b5e3c" stroke="#8b5e3c" stroke-width="0.4" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>`;
    deleteBtn.dataset.id = book.id;

    deleteBtn.addEventListener('click', delBookFromLibrary);

    const editBtn = document.createElement('button');
    editBtn.className = 'edit-button';
    editBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#8b5e3c" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg>`;
    editBtn.dataset.id = book.id;

    editBtn.addEventListener('click', editBookDetails); // add this function

    modifyCell.appendChild(deleteBtn);
    modifyCell.appendChild(editBtn);

    row.appendChild(titleCell);
    row.appendChild(authorCell);
    row.appendChild(pagesCell);
    row.appendChild(statusCell);
    row.appendChild(modifyCell);

    tableBody.appendChild(row);
  });
}

displayLibrary();

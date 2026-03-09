Bookie 📚
A collection of sweet reads

Bookie is a small vanilla‑JS library app that lets you and your friends track books you’ve read (or want to read), search your collection, and toggle read status — all in a cozy “cookie” color palette.

Features
Add new books with:

Title

Author (first and last name validation)

Number of pages

Read / Not read status

See your books in a styled table with:

Title, author, page count, status

Actions to delete a book or toggle its read status

Search bar:

Filter by title or author in real time

Client‑side validation:

Friendly error messages for missing/invalid inputs

Custom rules for author name (requires first and last name)

Persisted data:

Books are stored in localStorage, so your list survives page refreshes on the same browser/device.

Tech Stack
HTML5

CSS3 (custom responsive layout, no framework)

Vanilla JavaScript (ES6+)

localStorage for persistence

Getting Started
Clone or download this repository.

Open index.html directly in your browser
or run a simple local server (for example with VS Code Live Server).

You should see the Bookie interface with some sample books pre‑loaded.

Usage
Add a new book
Click the New Book button.

Fill in all fields in the “Add A New Book” form:

Title of book

Author name (first and last name)

Number of pages (10–7000)

Read status (dropdown)

Click Save.

If any field is invalid, an inline error message will appear. Once everything is valid, the book is added to the table and saved to localStorage.

Search your library
Use the search bar at the top to filter by:

Book title (partial matches)

Author name (partial matches)

Clear the search input and press Search again (or submit an empty search) to show all books.

Modify books
Toggle read status:
Click the pencil icon in the Modify column to switch between “Read” and “Not read”.

Delete a book:
Click the trash‑can icon to remove a book from the list.

All changes are immediately written to localStorage.

Data Persistence
Bookie uses the browser’s localStorage API to save the myLibrary array as JSON.

On load, the app:

Tries to read the saved library from localStorage.

If none is found, it falls back to a built‑in set of sample books.

On any change (add/delete/toggle read), the library is serialized with JSON.stringify and written back to localStorage.

This means the same browser + device will keep its own copy of the library; it’s not synced across different devices.

Project Structure
index.html – main page layout and markup

main.css – styles for layout, colors, table, and form

library.js – all app logic:

Book constructor

Validation functions

Add / save / close form logic

Search and filter

Table rendering (displayLibrary)

Local storage load/save helpers

Future Improvements
Support editing full book details (not just read status)

Sort by title, author, or page count

Add categories/genres and filters

Export/import the library as JSON so friends can share lists

Dark/light theme toggle

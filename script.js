// Load notes from localStorage on page load
window.onload = function() {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  const noteList = document.getElementById('noteList');

  notes.forEach(function(noteText) {
    const li = createNoteElement(noteText);
    noteList.appendChild(li);
  });
};

// Function to create a new note element
function createNoteElement(noteText) {
  const li = document.createElement('li');
  li.classList.add('note');
  li.innerHTML = `
    <div class="note-text">${noteText}</div>
    <button class="delete-btn" onclick="deleteNote(this)">Delete</button>
  `;
  return li;
}

// Function to add a new note
function addNote() {
  const noteInput = document.getElementById('noteInput');
  const noteText = noteInput.value.trim();

  if (noteText !== '') {
    const noteList = document.getElementById('noteList');
    const li = createNoteElement(noteText);
    noteList.appendChild(li);

    // Save notes to localStorage
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(noteText);
    localStorage.setItem('notes', JSON.stringify(notes));

    noteInput.value = '';
  }
}

// Function to delete a note
function deleteNote(btn) {
  const li = btn.parentElement;
  const noteText = li.querySelector('.note-text').innerText;

  // Remove the note from the DOM
  li.remove();

  // Remove the note from localStorage
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  const updatedNotes = notes.filter(note => note !== noteText);
  localStorage.setItem('notes', JSON.stringify(updatedNotes));
}

// Function to download notes as a text file
function downloadNotes() {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  const notesText = notes.join('\n');
  const blob = new Blob([notesText], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'notes.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

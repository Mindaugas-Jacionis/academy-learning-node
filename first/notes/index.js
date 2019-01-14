const { readFileSync, writeFileSync } = require("fs");
const path = require("path");

const file = path.join(__dirname, "notes.json");

const getAll = () => {
  const notesFileContent = readFileSync(file, { encoding: "utf-8" }) || "[]";
  return JSON.parse(notesFileContent);
};

const addNote = (title, body) => {
  const allNotes = getAll();
  const lastNote = allNotes[allNotes.length - 1];
  const id = (lastNote && lastNote.id + 1) || 0;
  let newNote = { title, body, id };

  writeFileSync(file, JSON.stringify([...allNotes, newNote]));
};

const getNote = id => {
  const allNotes = getAll();
  return allNotes.find(note => note.id === id) || null;
};

const deleteNote = id => {
  const filteredNotes = getAll().filter(note => note.id !== id);

  writeFileSync(file, JSON.stringify(filteredNotes));
};

module.exports = { addNote, getAll, getNote, deleteNote };

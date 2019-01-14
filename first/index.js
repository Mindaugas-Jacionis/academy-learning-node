const fs = require("fs");
const notes = require("./notes");
const { argv } = require("yargs");

try {
  switch (argv.method) {
    case "getAll":
      console.log(notes.getAll());
      break;
    case "addNote":
      notes.addNote(argv.title, argv.body);
      break;
    case "getNote":
    case "deleteNote":
      console.log(notes[argv.method](argv.id) || "");
      break;
    default:
      console.log(notes.getAll());
  }
} catch (e) {
  console.log("Error:", e);
}

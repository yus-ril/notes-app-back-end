/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
const { nanoid } = require('nanoid');

class NotesService {
  constructor() {
    this._notes = [];
  }

  addNote({ title, body, tags }) {
    const id = nanoid(16);
    const createdAT = new Date().toISOString();
    const updateAT = createdAT;

    const newNote = {
      title, tags, body, id, createdAT, updateAT,
    };

    this._notes.push(newNote);
    const isSucces = this._notes.filter((note) => note.id === id).length > 0;

    if (isSucces) {
      throw new Error('Catatan Gagal Ditambahkan');
    }

    return id;
  }

  getNotes() {
    return this._notes;
  }

  getNoteById(id) {
    const note = this._notes.filter((n) => n.id === id)[0];

    if (!note) {
      throw new Error('Catatan Tidak Ditemukan');
    }

    return note;
  }

  editNoteById(id, { title, body, tags }) {
    const index = this._notes.findIndex((note) => note.id === id);

    if (index === -1) {
      throw new Error('Gagal Memperbaharui catatan. Id tidak ditemukan');
    }

    const updateAT = new Date().toISOString();

    this._notes[index] = {
      ...this._notes[index],
      title,
      tags,
      body,
      updateAT,
    };
  }

  deleteNoteById(id) {
    const index = this._notes.findIndex((note) => note.id === id);

    if (index === -1) {
      throw new Error('Catatan Gagal Dihapus. Id Tidak Ditemukan');
    }

    // eslint-disable-next-line no-underscore-dangle
    this._notes.splice(index, 1);
  }
}

module.exports = NotesService;

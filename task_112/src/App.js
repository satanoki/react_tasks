import React, { useState } from 'react';
import './App.css';

const Notepad = () => {
  const [notes, setNotes] = useState([]); // Массив записей
  const [currentNote, setCurrentNote] = useState(""); // Текущий текст записи
  const [currentNoteId, setCurrentNoteId] = useState(null); // Идентификатор текущей записи
  const [searchTerm, setSearchTerm] = useState(""); // Поисковый запрос

  const handleAddNote = () => {
    const newNote = {
      id: notes.length + 1,
      text: currentNote
    };
    setNotes([...notes, newNote]);
    setCurrentNote(""); // Очистка поля ввода
  };

  const handleSelectNote = (id) => {
    const note = notes.find(note => note.id === id);
    setCurrentNoteId(id);
    setCurrentNote(note.text);
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const filteredNotes = notes.filter(note =>
    note.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="notepad-container">
      <div className="search-container">
        <h2>Поиск записей</h2>
        <input
          type="text"
          placeholder="Поиск..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="notes-list">
        <h2>Список записей</h2>
        <ul>
          {filteredNotes.map(note => (
            <li key={note.id}>
              Запись {note.id}
              <button onClick={() => handleSelectNote(note.id)} className="button">Выбрать</button>
              <button onClick={() => handleDeleteNote(note.id)} className="button">Удалить</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="note-editor">
        <h2>Редактирование записи</h2>
        <textarea
          value={currentNote}
          onChange={(e) => setCurrentNote(e.target.value)}
          className="textarea"
        />
        <button onClick={handleAddNote} className="button">Добавить запись</button>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Notepad />
    </div>
  );
}

export default App;

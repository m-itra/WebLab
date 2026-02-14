import { useState } from 'react';
import Header from './Header';
import NoteForm from './NoteForm';
import NoteList from './NoteList';
import './styles/App.css';

function App() {
  
  const [notes, setNotes] = useState([]);

  // Функция добавления заметки
  const addNote = (title, content) => {
    const newNote = {
      id: Date.now(),
      title: title,
      content: content,
      createdAt: new Date().toLocaleString('ru-RU')
    };
    setNotes([newNote, ...notes]);
  };

  // Функция удаления заметки
  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="app">
      <Header notesCount={notes.length} />
      <div className="container">
        <NoteForm onAddNote={addNote} />
        <NoteList notes={notes} onDeleteNote={deleteNote} />
      </div>
    </div>
  );
}


export default App

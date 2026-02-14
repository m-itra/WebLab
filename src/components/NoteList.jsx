import NoteItem from './NoteItem';
import './styles/NoteList.css';

function NoteList({ notes, onDeleteNote }) {
  // Если заметок нет, показываем сообщение
  if (notes.length === 0) {
    return (
      <div className="note-list-empty">
        <p>У вас пока нет заметок</p>
      </div>
    );
  }

  return (
    <div className="note-list">
      <h2>Ваши заметки</h2>
      <div className="notes-grid">
        {notes.map(note => (
          <NoteItem 
            key={note.id} 
            note={note} 
            onDelete={onDeleteNote} 
          />
        ))}
      </div>
    </div>
  );
}

export default NoteList;
import NoteItem from './NoteItem';
import './styles/NoteList.css';

function NoteList({ notes, onDelete, onEdit }) {

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
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
}

export default NoteList;
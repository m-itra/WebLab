import './styles/NoteItem.css';

function NoteItem({ note, onDelete }) {
  return (
    <div className="note-item">
      <div className="note-header">
        <h3 className="note-title">{note.title}</h3>
        <button 
          onClick={() => onDelete(note.id)}
          className="btn-delete"
          title="Удалить заметку"
        >
          🗑️
        </button>
      </div>
      <p className="note-content">{note.content}</p>
      <div className="note-footer">
        <span className="note-date">📅 {note.createdAt}</span>
      </div>
    </div>
  );
}

export default NoteItem;
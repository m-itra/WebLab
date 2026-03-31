import NoteItem from './NoteItem';
import Pagination from './Pagination';
import './styles/NoteList.css';

function NoteList({ notes, onDelete, onEdit, currentPage, totalPages, onPageChange }) {
  if (notes.length === 0) {
    return (
      <div className="note-list-empty">
        <p>Заметки не найдены</p>
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}

export default NoteList;
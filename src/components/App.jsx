import { useNotes } from './hooks/useNotes';
import Header from './Header';
import NoteForm from './NoteForm';
import NoteList from './NoteList';
import SearchBar from './SearchBar';
import './styles/App.css';

function App() {
  const {
    notes,
    status,
    editingNote,
    errorMessage,
    currentPage,
    totalPages,
    totalCount,
    dispatch,
    handleSearch,
    handleSave,
    handleSaveEdit,
    handleDelete,
    goToPage,
  } = useNotes();

  return (
    <div className="app">
      <Header notesCount={totalCount} status={status} />
      <div className="container">
        <NoteForm
          status={status}
          editingNote={editingNote}
          errorMessage={errorMessage}
          onStartCreating={() => dispatch({ type: 'START_CREATING' })}
          onCancel={() =>
            dispatch({ type: status === 'editing' ? 'CANCEL_EDITING' : 'CANCEL_CREATING' })
          }
          onSave={handleSave}
          onSaveEdit={handleSaveEdit}
          onClearError={() => dispatch({ type: 'CLEAR_ERROR' })}
        />
        <div>
          <SearchBar onSearch={handleSearch} />
          <NoteList
            notes={notes}
            onDelete={handleDelete}
            onEdit={(id) => dispatch({ type: 'START_EDITING', payload: id })}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
import { useReducer } from 'react';
import Header from './Header';
import NoteForm from './NoteForm';
import NoteList from './NoteList';
import './styles/App.css';

const initialState = {
  notes: [],
  status: 'idle',
  editingNote: null,
  errorMessage: '',
};

function notesReducer(state, action) {
  switch (action.type) {

    case 'START_CREATING':
      return { ...state, status: 'creating', editingNote: null, errorMessage: '' };

    case 'START_SAVING':
      return { ...state, status: 'saving' };

    case 'CANCEL_CREATING':
      return { ...state, status: 'idle', errorMessage: '' };

    case 'SAVE_NOTE': {
      const { title, content } = action.payload;
      if (!title.trim() || !content.trim()) {
        return { ...state, status: 'error', errorMessage: 'Пожалуйста, заполните все поля!' };
      }
      const newNote = {
        id: Date.now(),
        title: title.trim(),
        content: content.trim(),
        createdAt: new Date().toLocaleString('ru-RU'),
      };
      return {
        ...state,
        notes: [newNote, ...state.notes],
        status: 'idle',
        errorMessage: '',
      };
    }

    case 'DELETE_NOTE':
      return {
        ...state,
        notes: state.notes.filter(n => n.id !== action.payload),
        status: 'idle',
        editingNote: null,
      };

    case 'START_EDITING': {
      const note = state.notes.find(n => n.id === action.payload);
      return { ...state, status: 'editing', editingNote: note, errorMessage: '' };
    }

    case 'SAVE_EDIT': {
      const { id, title, content } = action.payload;
      if (!title.trim() || !content.trim()) {
        return { ...state, status: 'error', errorMessage: 'Пожалуйста, заполните все поля!' };
      }
      return {
        ...state,
        notes: state.notes.map(n =>
          n.id === id ? { ...n, title: title.trim(), content: content.trim() } : n
        ),
        status: 'idle',
        editingNote: null,
        errorMessage: '',
      };
    }

    case 'CANCEL_EDITING':
      return { ...state, status: 'idle', editingNote: null, errorMessage: '' };

    case 'CLEAR_ERROR':
      return { ...state, status: state.editingNote ? 'editing' : 'creating', errorMessage: '' };

    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(notesReducer, initialState);
  const { notes, status, editingNote, errorMessage } = state;
  const handleSave = (title, content) => {
    dispatch({ type: 'START_SAVING' });
    setTimeout(() => {
      dispatch({ type: 'SAVE_NOTE', payload: { title, content } });
    }, 500);
  };

  return (
    <div className="app">
      <Header notesCount={notes.length} status={status} />
      <div className="container">
        <NoteForm
          status={status}
          editingNote={editingNote}
          errorMessage={errorMessage}
          onStartCreating={() => dispatch({ type: 'START_CREATING' })}
          onCancel={() => dispatch({ type: status === 'editing' ? 'CANCEL_EDITING' : 'CANCEL_CREATING' })}
          onSave={handleSave}
          onSaveEdit={(id, title, content) => dispatch({ type: 'SAVE_EDIT', payload: { id, title, content } })}
          onClearError={() => dispatch({ type: 'CLEAR_ERROR' })}
        />
        <NoteList
          notes={notes}
          onDelete={(id) => dispatch({ type: 'DELETE_NOTE', payload: id })}
          onEdit={(id) => dispatch({ type: 'START_EDITING', payload: id })}
        />
      </div>
    </div>
  );
}

export default App;
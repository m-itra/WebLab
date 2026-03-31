export const initialState = {
  allNotes: [],
  status: 'idle',
  editingNote: null,
  errorMessage: '',
  currentPage: 1,
  pageSize: 9,
  searchQuery: '',
};

export function notesReducer(state, action) {
  switch (action.type) {

    case 'FETCH_START':
      return { ...state, status: 'loading', errorMessage: '' };

    case 'FETCH_SUCCESS':
      return {
        ...state,
        status: 'idle',
        allNotes: action.payload,
        errorMessage: '',
      };

    case 'FETCH_ERROR':
      return { ...state, status: 'error', errorMessage: action.payload };

    case 'START_CREATING':
      return { ...state, status: 'creating', editingNote: null, errorMessage: '' };

    case 'CANCEL_CREATING':
      return { ...state, status: 'idle', errorMessage: '' };

    case 'START_SAVING':
      return { ...state, status: 'saving' };

    case 'SAVE_SUCCESS':
      return {
        ...state,
        status: 'idle',
        allNotes: [action.payload, ...state.allNotes],
        currentPage: 1,
        errorMessage: '',
      };

    case 'SAVE_ERROR':
      return { ...state, status: 'error', errorMessage: action.payload };

    case 'START_EDITING': {
      const note = state.allNotes.find((n) => n.id === action.payload);
      return { ...state, status: 'editing', editingNote: note, errorMessage: '' };
    }

    case 'CANCEL_EDITING':
      return { ...state, status: 'idle', editingNote: null, errorMessage: '' };

    case 'EDIT_SUCCESS':
      return {
        ...state,
        status: 'idle',
        editingNote: null,
        allNotes: state.allNotes.map((n) =>
          n.id === action.payload.id ? { ...n, ...action.payload } : n
        ),
        errorMessage: '',
      };

    case 'DELETE_START':
      return { ...state, status: 'deleting' };

    case 'DELETE_SUCCESS':
      return {
        ...state,
        status: 'idle',
        allNotes: state.allNotes.filter((n) => n.id !== action.payload),
        editingNote: state.editingNote?.id === action.payload ? null : state.editingNote,
      };

    case 'DELETE_ERROR':
      return { ...state, status: 'idle', errorMessage: action.payload };

    case 'SET_PAGE':
      return { ...state, currentPage: action.payload };

    case 'SET_SEARCH':
      return { ...state, searchQuery: action.payload, currentPage: 1 };

    case 'CLEAR_ERROR':
      return {
        ...state,
        status: state.editingNote ? 'editing' : 'creating',
        errorMessage: '',
      };

    default:
      return state;
  }
}
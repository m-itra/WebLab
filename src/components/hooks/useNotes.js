import { useReducer, useEffect, useCallback, useRef, useMemo } from 'react';
import { notesReducer, initialState } from './notesReducer';
import { postsApi } from '../api/postsApi';

const isLocalNote = (id) => id > 100;

export function useNotes() {
  const [state, dispatch] = useReducer(notesReducer, initialState);
  const { allNotes, currentPage, pageSize, searchQuery } = state;
  const debounceTimer = useRef(null);

  // Загрузка всех заметок
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      dispatch({ type: 'FETCH_START' });
      try {
        const notes = await postsApi.fetchAllPosts(100);
        if (!cancelled) dispatch({ type: 'FETCH_SUCCESS', payload: notes });
      } catch (err) {
        if (!cancelled) dispatch({ type: 'FETCH_ERROR', payload: err.message });
      }
    };
    load();
    return () => { cancelled = true; };
  }, []);

  // Поиск и пагинация
  const { notes, totalCount, totalPages } = useMemo(() => {
    const filtered = searchQuery.trim()
      ? allNotes.filter(
          (n) =>
            n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            n.content.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : allNotes;

    const total = filtered.length;
    const pages = Math.ceil(total / pageSize) || 1;
    const start = (currentPage - 1) * pageSize;
    const paginated = filtered.slice(start, start + pageSize);

    return { notes: paginated, totalCount: total, totalPages: pages };
  }, [allNotes, searchQuery, currentPage, pageSize]);

  // Обработчик поиска
  const handleSearch = useCallback((query) => {
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      dispatch({ type: 'SET_SEARCH', payload: query });
    }, 300);
  }, []);

  // Обработчик сохранения
  const handleSave = useCallback(async (title, content) => {
    if (!title.trim() || !content.trim()) {
      dispatch({ type: 'SAVE_ERROR', payload: 'Пожалуйста, заполните все поля!' });
      return;
    }
    dispatch({ type: 'START_SAVING' });
    try {
      const created = await postsApi.createPost({ title, content });
      dispatch({ type: 'SAVE_SUCCESS', payload: created });
    } catch (err) {
      dispatch({ type: 'SAVE_ERROR', payload: err.message });
    }
  }, []);

  // Обработчик редактирования
  const handleSaveEdit = useCallback(async (id, title, content) => {
    if (!title.trim() || !content.trim()) {
      dispatch({ type: 'SAVE_ERROR', payload: 'Пожалуйста, заполните все поля!' });
      return;
    }
    dispatch({ type: 'START_SAVING' });
    try {
      let updated;
      if (isLocalNote(id)) {
        updated = { id, title, content };
      } else {
        updated = await postsApi.updatePost({ id, title, content });
      }
      dispatch({ type: 'EDIT_SUCCESS', payload: updated });
    } catch (err) {
      dispatch({ type: 'SAVE_ERROR', payload: err.message });
    }
  }, []);

  // Обработчик удаления
  const handleDelete = useCallback(async (id) => {
    dispatch({ type: 'DELETE_START' });
    try {
      if (!isLocalNote(id)) {
        await postsApi.deletePost(id);
      }
      dispatch({ type: 'DELETE_SUCCESS', payload: id });
    } catch (err) {
      dispatch({ type: 'DELETE_ERROR', payload: err.message });
    }
  }, []);

  return {
    ...state,
    notes,
    totalCount,
    totalPages,
    dispatch,
    handleSearch,
    handleSave,
    handleSaveEdit,
    handleDelete,
    goToPage: (page) => dispatch({ type: 'SET_PAGE', payload: page }),
  };
}
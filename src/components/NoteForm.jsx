import { useState, useEffect } from 'react';
import './styles/NoteForm.css';

function NoteForm({ status, editingNote, errorMessage, onStartCreating, onCancel, onSave, onSaveEdit, onClearError }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const isActive = status === 'creating' || status === 'editing' || status === 'error' || status === 'saving';;

  // При переходе в режим редактирования заполняем поля
  useEffect(() => {
    if (status === 'editing' && editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
    }
    if (status === 'idle') {
      setTitle('');
      setContent('');
    }
  }, [status, editingNote]);

  //  Кнопка "Создать заметку" когда форма скрыта
  if (!isActive) {
    return (
      <div className="note-form-container">
        <button className="btn-add" onClick={onStartCreating}>
          + Создать заметку
        </button>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status === 'editing') {
      onSaveEdit(editingNote.id, title, content);
    } else {
      onSave(title, content);
    }
  };

  return (
    <div className="note-form-container">
      <h2>{status === 'editing' ? 'Редактировать заметку' : 'Создать новую заметку'}</h2>

      {errorMessage && (
        <div className="error-message" onClick={onClearError}>
          ⚠️ {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="note-form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Заголовок заметки..."
            value={title}
            onChange={(e) => { setTitle(e.target.value); if (errorMessage) onClearError(); }}
            className={`form-input ${errorMessage ? 'input-error' : ''}`}
            maxLength="50"
            autoFocus
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="Текст заметки..."
            value={content}
            onChange={(e) => { setContent(e.target.value); if (errorMessage) onClearError(); }}
            className={`form-textarea ${errorMessage ? 'input-error' : ''}`}
            rows="4"
            maxLength="105"
          />
        </div>
        <div className="form-buttons">
          <button type="submit" disabled={status === 'saving'} className="btn-add">
            {status === 'saving' ? '💾 Сохранение...' : status === 'editing' ? '💾 Сохранить' : 'Добавить заметку'}
          </button>
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
}

export default NoteForm;
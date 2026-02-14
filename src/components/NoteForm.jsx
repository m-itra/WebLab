import { useState } from 'react';
import './styles/NoteForm.css';

function NoteForm({ onAddNote }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Проверка на пустые поля
    if (title.trim() === '' || content.trim() === '') {
      alert('Пожалуйста, заполните все поля!');
      return;
    }

    // Вызываем функцию добавления заметки из родительского компонента
    onAddNote(title, content);

    // Очищаем поля формы
    setTitle('');
    setContent('');
  };

  return (
    <div className="note-form-container">
      <h2>Создать новую заметку</h2>
      <form onSubmit={handleSubmit} className="note-form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Заголовок заметки..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
            maxLength="50"
          />
        </div>
        <div className="form-group">
          <textarea
            maxLength={105}
            placeholder="Текст заметки..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-textarea"
            rows="4"
          />
        </div>
        <button type="submit" className="btn-add">
          Добавить заметку
        </button>
      </form>
    </div>
  );
}

export default NoteForm;
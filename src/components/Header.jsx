import './styles/Header.css';

const STATUS_LABELS = {
  idle: '',
  creating: '✏️ Создание заметки...',
  saving: '💾 Сохранение...',
  editing: '🔧 Редактирование...',
  error: '⚠️ Ошибка ввода',
};

function Header({ notesCount, status }) {
  return (
    <header className="header">
      <div className="header-content">
        <h1>Заметки</h1>
        <div className="header-right">
          {STATUS_LABELS[status] && (
            <span className={`status-badge status-${status}`}>{STATUS_LABELS[status]}</span>
          )}
          <div className="notes-counter">
            Всего заметок: <span className="count">{notesCount}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
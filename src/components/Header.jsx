import './styles/Header.css';

function Header({ notesCount }) {
  return (
    <header className="header">
      <div className="header-content">
        <h1>Заметки</h1>
        <div className="notes-counter">
          Всего заметок: <span className="count">{notesCount}</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
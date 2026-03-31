import { useState } from 'react';
import './styles/SearchBar.css';

function SearchBar({ onSearch }) {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    const q = e.target.value;
    setValue(q);
    onSearch(q);
  };

  const handleClear = () => {
    setValue('');
    onSearch('');
  };

  return (
    <div className="search-bar">
      <span className="search-bar__icon">🔍</span>
      <input
        type="text"
        className="search-bar__input"
        placeholder="Поиск заметок..."
        value={value}
        onChange={handleChange}
      />
      {value && (
        <button className="search-bar__clear" onClick={handleClear} title="Очистить">✕</button>
      )}
    </div>
  );
}

export default SearchBar;
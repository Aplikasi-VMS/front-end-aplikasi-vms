'use client';

import { useState, useEffect } from 'react';

export default function SearchInput({
  value,
  onChange,
  placeholder = 'Search...',
  debounce = 300
}) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(inputValue);
    }, debounce);

    return () => clearTimeout(timer);
  }, [inputValue, debounce, onChange]);

  return (
    <input
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      placeholder={placeholder}
      className="border rounded px-3 py-2 w-full max-w-md"
    />
  );
}
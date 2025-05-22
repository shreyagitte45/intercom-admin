import React from 'react';

export default function SearchBar({ value, onChange }) {
  return (
    <div className="mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Search conversations..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

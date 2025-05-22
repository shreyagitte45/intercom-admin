import React from 'react';

const conversations = [
  { name: 'Luis - Github', preview: 'Hey! I have a question...', time: '1m' },
  { name: 'Nike', preview: 'Hi there, I have a q...', time: '40m' },
  { name: 'Lead from New York', preview: 'Good morning...', time: '45m' },
];

export default function Sidebar() {
  return (
    <div className="p-3">
      <h5>Your Inbox</h5>
      <ul className="list-group mt-3">
        {conversations.map((conv, idx) => (
          <li key={idx} className="list-group-item list-group-item-action">
            <strong>{conv.name}</strong>
            <br />
            <small>{conv.preview} - {conv.time}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

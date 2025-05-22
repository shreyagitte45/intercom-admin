import React, { useState } from 'react';
import SearchBar from './SearchBar';
import './InboxList.css';

const initialConversations = [
  {
    id: 1,
    name: 'Luis - Github',
    preview: 'Hey! I have a question...',
    time: '45m',
    avatar: 'L',
    color: '#E53935',
    unread: false,
  },
  {
    id: 2,
    name: 'Ivan - Nike',
    preview: 'Hi there, I have a qu...',
    time: '30m',
    avatar: 'I',
    color: '#FFB300',
    unread: true,
  },
  {
    id: 3,
    name: 'Lead from New York',
    preview: 'Good morning, let me...',
    time: '40m',
    avatar: 'L',
    color: '#1E88E5',
    unread: true,
  },
  {
    id: 4,
    name: 'Booking API problems',
    preview: 'Bug report',
    time: '45m',
    avatar: 'B',
    color: '#8E24AA',
    unread: true,
  },
  {
    id: 5,
    name: 'Miracle - Exemplary Bank',
    preview: "Hey there, I'm here to...",
    time: '45m',
    avatar: 'M',
    color: '#43A047',
    unread: false,
  },
];

export default function InboxList({ selectedId, setSelectedId, searchTerm, setSearchTerm }) {
  const [filterStatus, setFilterStatus] = useState('Open');
  const [sortOrder, setSortOrder] = useState('Waiting longest');
  const [conversations, setConversations] = useState(initialConversations);
  const [viewType, setViewType] = useState('compact');

  const handleSelectConversation = (id) => {
    setSelectedId(id);
    // mark message as read
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === id ? { ...conv, unread: false } : conv
      )
    );
  };

  const filtered = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="inbox-container p-3 d-flex flex-column h-100">
      
      <h6 className="mb-3 fw-semibold">Your inbox</h6>

      
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div className="dropdown">
          <button
            className="btn btn-sm btn-outline-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
          >
            {filterStatus}
          </button>
          <ul className="dropdown-menu">
            <li><button className="dropdown-item" onClick={() => setFilterStatus('Open')}>Open</button></li>
            <li><button className="dropdown-item" onClick={() => setFilterStatus('Closed')}>Closed</button></li>
          </ul>
        </div>

        <div className="dropdown">
          <button
            className="btn btn-sm btn-outline-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
          >
            {sortOrder}
          </button>
          <ul className="dropdown-menu">
            <li><button className="dropdown-item" onClick={() => setSortOrder('Waiting longest')}>Waiting longest</button></li>
            <li><button className="dropdown-item" onClick={() => setSortOrder('Most recent')}>Most recent</button></li>
          </ul>
        </div>
      </div>


      <SearchBar value={searchTerm} onChange={setSearchTerm} />

    
      <ul className="list-group inbox-list flex-grow-1 overflow-auto mt-2">
        {filtered.map((conv) => (
          <li
            key={conv.id}
            className={`list-group-item list-group-item-action inbox-item ${selectedId === conv.id ? 'active' : ''} ${viewType}`}
            onClick={() => handleSelectConversation(conv.id)}
          >
            <div className="d-flex align-items-center">
              <div className="avatar-circle me-2" style={{ backgroundColor: conv.color }}>
                {conv.avatar}
              </div>
              <div className="flex-grow-1">
                <strong className="d-block">{conv.name}</strong>
                <small className="text-muted">{conv.preview}</small>
              </div>
              <div className="text-end ms-2">
                <small className="text-muted">{conv.time}</small>
                {conv.unread && (
                  <>
                    
                    <span className="badge newcol ms-1">1</span>
                  </>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>

     
      <div className="d-flex justify-content-start mt-3 gap-2">
        <button
          className={`btn btn-light btn-sm ${viewType === 'compact' ? 'active' : ''}`}
          title="Compact View"
          onClick={() => setViewType('compact')}
        >
          <i className="bi bi-layout-sidebar"></i>
        </button>
        <button
          className={`btn btn-light btn-sm ${viewType === 'expanded' ? 'active' : ''}`}
          title="Expanded View"
          onClick={() => setViewType('expanded')}
        >
          <i className="bi bi-list-task"></i>
        </button>
      </div>
    </div>
  );
}

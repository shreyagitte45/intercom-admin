import React from 'react';

export default function ChatHeader({ user, showPanel, onTogglePanel, onCloseChat, isDetailsActive }) {
  return (
    <div className="d-flex justify-content-between align-items-center border-bottom p-3 bg-white position-relative">
      <h6 className="m-0 text-truncate">{user}</h6>

      <div className="d-flex align-items-center gap-2">
     
        {isDetailsActive && (
          <>
            <button className="btn btn-light btn-sm">Snooze</button>
            <button className="btn btn-light btn-sm">Call</button>
            <button className="btn btn-light btn-sm">Ticket</button>
            <button className="btn btn-light btn-sm" title="Favorite">★</button>
          </>
        )}

       
        {!showPanel && (
          <button
            className="btn btn-light btn-sm"
            onClick={onTogglePanel}
            title="Reopen Copilot"
          >
            <i className="bi bi-layout-sidebar-inset-reverse"></i>
          </button>
        )}


        <div className="dropdown">
          <button className="btn btn-sm" data-bs-toggle="dropdown">
            <i className="bi bi-three-dots-vertical"></i>
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            <li><button className="dropdown-item">Mark as resolved</button></li>
            <li><button className="dropdown-item">Block user</button></li>
            <li><button className="dropdown-item">Delete conversation</button></li>
          </ul>
        </div>

        <button className="btn btn-dark btn-sm" onClick={onCloseChat}>
          Close
        </button>
      </div>
    </div>
  );
}

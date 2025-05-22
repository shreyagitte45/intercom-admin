import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';

export default function ChatInput({ value, onChange, onSend }) {
  const [showEmoji, setShowEmoji] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSend();
    }
  };

  const onEmojiClick = (emojiData) => {
    onChange(value + emojiData.emoji);
    setShowEmoji(false);
  };

  return (
    <div className="chat-input border-top p-3 position-relative bg-white">

      <div className="d-flex justify-content-between align-items-center mb-2">
        <strong className="small">💬 Chat ▾</strong>
        <span className="text-muted small">Use ⌘K for shortcuts</span>
      </div>

     
      <div className="mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="Type a message..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

     
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex gap-2">
          <button className="btn btn-light btn-sm" title="Lightning">
            <i className="bi bi-lightning-charge"></i>
          </button>
          <button className="btn btn-light btn-sm" title="Emoji" onClick={() => setShowEmoji(!showEmoji)}>
            <i className="bi bi-emoji-smile"></i>
          </button>
          <button className="btn btn-light btn-sm" title="Attach file">
            <i className="bi bi-paperclip"></i>
          </button>
          <button className="btn btn-light btn-sm" title="Insert note">
            <i className="bi bi-journal-text"></i>
          </button>
        </div>

        <button
          className="btn btn-dark btn-sm"
          onClick={onSend}
          disabled={!value.trim()}
        >
          Send
        </button>
      </div>

      {showEmoji && (
        <div className="emoji-picker-popup position-absolute bottom-100 start-0 mb-2 z-3">
          <EmojiPicker onEmojiClick={onEmojiClick} height={300} width={300} />
        </div>
      )}
    </div>
  );
}

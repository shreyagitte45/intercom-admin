import React, { useEffect, useRef } from 'react';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import '../assets/styles.css';

export default function ChatWindow({
  selectedId,
  userName,
  messages,
  setMessages,
  inputText,
  setInputText,
  showPanel,
  onTogglePanel,
  onCloseChat,
  isDetailsActive
}) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMsg = {
      from: 'agent',
      text: inputText.trim(),
      time: 'Just now',
      seen: true,
    };

    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);
    setInputText('');
  };

  return (
    <div className="d-flex flex-column h-100">
      <ChatHeader
        user={userName}
        showPanel={showPanel}
        onTogglePanel={onTogglePanel}
        onCloseChat={onCloseChat}
        isDetailsActive={isDetailsActive}
      />

      <div ref={scrollRef} className="chat-scroll-area">
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((msg, idx) => {
            const isUser = msg.from === 'user';
            const avatarLetter = isUser ? 'L' : 'A';

            return (
              <div key={idx} className={`d-flex ${isUser ? 'justify-content-start' : 'justify-content-end'} mb-3`}>
                {isUser && <div className="chat-avatar me-2">{avatarLetter}</div>}
                <div className={`chat-bubble fade-in ${isUser ? 'chat-bubble-left' : 'chat-bubble-right'}`}>
                  <div className="chat-text">{msg.text}</div>
                  <div className="text-muted small mt-1 text-end">
                    {msg.seen ? 'Seen · ' : ''}{msg.time}
                  </div>
                </div>
                {!isUser && <div className="chat-avatar ms-2">{avatarLetter}</div>}
              </div>
            );
          })
        ) : (
          <div className="text-muted text-center mt-5">No messages yet.</div>
        )}
      </div>

      <ChatInput
        value={inputText}
        onChange={setInputText}
        onSend={handleSend}
      />
    </div>
  );
}

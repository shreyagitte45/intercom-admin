import React, { useState, useRef, useEffect } from 'react';
import DetailsTab from './RightPanelDetailsTab';
import '../assets/styles.css';

export default function RightPanel({ onToggle, onAddToComposer, setIsDetailsActive }) {
  const [tab, setTab] = useState('copilot');
  const [query, setQuery] = useState('');
  const [aiMessage, setAiMessage] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [hovered, setHovered] = useState(null);
  const responseRef = useRef(null);

  const handleSuggestedClick = () => {
    setIsTyping(true);
    setTimeout(() => {
      setAiMessage({
        question: 'How do I get a refund?',
        answer: 'We understand that sometimes a purchase may not meet your expectations, and you may need a refund.',
        sources: [
          'Getting a refund',
          'Refund for an item replaced by mistake',
          'Refund for an unwanted gift',
        ],
      });
      setIsTyping(false);
    }, 1500);
  };

  useEffect(() => {
    if (responseRef.current) {
      responseRef.current.scrollTop = responseRef.current.scrollHeight;
    }
  }, [aiMessage]);

  return (
    <div className="d-flex flex-column h-100 bg-white p-3 right-panel">
  
      <div className="d-flex justify-content-between align-items-center border-bottom mb-3">
        <div>
  <button
    className={`tab-button ${tab === 'copilot' ? 'active' : ''}`}
    onClick={() => {
      setTab('copilot');
      setIsDetailsActive(false); // 👈 turn off extra buttons
    }}
  >
    AI Copilot
  </button>

  <button
    className={`tab-button ${tab === 'details' ? 'active' : ''}`}
    onClick={() => {
      setTab('details');
      setIsDetailsActive(true); // 👈 turn on extra buttons
    }}
  >
    Details
  </button>
</div>

        <button className="btn btn-sm btn-light" onClick={onToggle}>
          <i className="bi bi-layout-sidebar-reverse"></i>
        </button>
      </div>

     
      {tab === 'copilot' && (
        <>
          {!aiMessage && !isTyping && (
            <div className="d-flex flex-column justify-content-center align-items-center text-center flex-grow-1 ai-response">
              <div className="ai-icon mb-2">🤖</div>
              <h6 className="fw-bold">Hi, I'm Fin AI Copilot</h6>
              <p className="text-muted small">Ask me anything about this conversation.</p>
            </div>
          )}

          {isTyping && (
            <div className="d-flex justify-content-center align-items-center flex-grow-1">
              <div className="typing-indicator text-muted small d-flex align-items-center gap-2">
                <div className="dot dot-1"></div>
                <div className="dot dot-2"></div>
                <div className="dot dot-3"></div>
                <span>Fin is typing...</span>
              </div>
            </div>
          )}

          {aiMessage && !isTyping && (
            <div className="ai-response-container flex-grow-1 mb-2" ref={responseRef}>
              <div className="mb-2">
                <strong>You</strong>
                <div className="chat-text mt-1">{aiMessage.question}</div>
              </div>

              <div className="mb-3 position-relative">
                <div className="d-flex align-items-center mb-1">
                  <div className="chat-avatar me-2">F</div>
                  <strong>Fin</strong>
                </div>

                <div className="ai-bubble p-3 position-relative">
                  <p>
                    We understand that sometimes a purchase may not meet your expectations, and you may need to
                    request a refund.
                    <sup className="superscript" onMouseEnter={() => setHovered(1)} onMouseLeave={() => setHovered(null)}>1</sup>
                  </p>
                  <p>To assist you with your refund request, please provide your order ID and proof of purchase.</p>
                  <p>
                    Once I’ve checked these details, I will send a return QR code. Your refund will be issued.
                    <sup className="superscript" onMouseEnter={() => setHovered(2)} onMouseLeave={() => setHovered(null)}>2</sup>
                  </p>

   
                  {hovered === 1 && (
                    <div className="tooltip-bubble">
                      You can request a refund within 60 days.
                      <button className="btn btn-outline-primary btn-sm mt-2" onClick={() => onAddToComposer("You can request a refund within 60 days.")}>
                        Add to composer
                      </button>
                    </div>
                  )}
                  {hovered === 2 && (
                    <div className="tooltip-bubble">
                      A return QR code will be emailed to you.
                      <button className="btn btn-outline-primary btn-sm mt-2" onClick={() => onAddToComposer("A return QR code will be emailed to you.")}>
                        Add to composer
                      </button>
                    </div>
                  )}

        
                  <div className="text-center mt-3">
                    <button className="btn btn-outline-primary btn-sm composer-btn" onClick={() => onAddToComposer(aiMessage.answer)}>
                      ✏️ Add to composer <i className="bi bi-chevron-down"></i>
                    </button>
                  </div>
                </div>
              </div>

              <small className="text-muted">15 relevant sources found</small>
              <ul className="list-unstyled small mt-2">
                {aiMessage.sources.map((s, i) => (
                  <li key={i} className="d-flex align-items-center mb-1">
                    <i className="bi bi-journal-text me-2"></i>
                    {s}
                  </li>
                ))}
              </ul>
              <a href="#" className="small">See all →</a>
            </div>
          )}

          <div className="mt-auto">
            {!aiMessage && !isTyping && (
              <div className="suggested-bar p-2 mb-2 rounded d-flex align-items-center cursor-pointer" onClick={handleSuggestedClick}>
                <span className="me-2">💡</span>
                <small>How do I get a refund?</small>
              </div>
            )}
            <div className="position-relative">
              <input
                type="text"
                className="form-control"
                placeholder="Ask a question..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <i className="bi bi-chevron-down position-absolute end-0 top-50 translate-middle-y me-3 text-muted"></i>
            </div>
          </div>
        </>
      )}

      {tab === 'details' && (
        <DetailsTab />
      )}
    </div>
  );
}
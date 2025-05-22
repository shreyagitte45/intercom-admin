import React, { useEffect, useState } from 'react';
import Sidebar from '../components/InboxList';
import ChatWindow from '../components/ChatWindow';
import RightPanel from '../components/RightPanel';
import '../assets/styles.css';

export default function Dashboard() {
  const contactNames = {
    1: 'Luis - Github',
    2: 'Ivan - Nike',
    3: 'Lead from New York',
    4: 'Booking API problems',
    5: 'Miracle - Exemplary Bank',
  };

  const initialMessages = {
    1: [
      { from: 'user', text: 'I bought a product from your store in November...', time: '1min' },
      { from: 'agent', text: 'Let me just look into this for you, Luis.', time: '1min', seen: true },
    ],
    2: [{ from: 'user', text: 'Hi there, I have a query about returns.', time: '30m' }],
    3: [{ from: 'user', text: 'Good morning, let me know about pricing.', time: '40m' }],
    4: [{ from: 'user', text: 'Bug report: API not responding.', time: '45m' }],
    5: [{ from: 'user', text: 'Hey there, I’m here to assist.', time: '45m' }],
  };

  const [messageMap, setMessageMap] = useState(initialMessages);
  const [selectedId, setSelectedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [inputText, setInputText] = useState('');
  const [screen, setScreen] = useState('desktop');
  const [showChat, setShowChat] = useState(false);
  const [showAI, setShowAI] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [isDetailsActive, setIsDetailsActive] = useState(false);

  useEffect(() => {
    const updateScreen = () => {
      const width = window.innerWidth;
      if (width < 768) setScreen('mobile');
      else if (width < 1024) setScreen('tablet');
      else setScreen('desktop');
    };
    window.addEventListener('resize', updateScreen);
    updateScreen();
    return () => window.removeEventListener('resize', updateScreen);
  }, []);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div className={`container-fluid main-layout ${darkMode ? 'dark-mode' : ''}`}>
      <div className="row vh-100">
        {(screen !== 'mobile' || !showChat) && (
          <div className={`${screen === 'desktop' ? 'col-md-3' : 'col-12'} border-end sidebar-bg`}>
            <Sidebar
              selectedId={selectedId}
              setSelectedId={(id) => {
                setSelectedId(id);
                setShowChat(true);
              }}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </div>
        )}

        {(screen === 'desktop' || showChat) && (
          <div className={`${screen === 'desktop' ? (showAI ? 'col-md-6' : 'col-md-9') : 'col-12'} p-0`}>
            {selectedId ? (
              <ChatWindow
                selectedId={selectedId}
                userName={contactNames[selectedId]}
                messages={Array.isArray(messageMap[selectedId]) ? messageMap[selectedId] : []}
                setMessages={(updatedMessages) =>
                  setMessageMap((prev) => ({
                    ...prev,
                    [selectedId]: updatedMessages,
                  }))
                }
                inputText={inputText}
                setInputText={setInputText}
                showPanel={showAI}
                onTogglePanel={() => setShowAI((prev) => !prev)}
                onCloseChat={() => {
                  setSelectedId(null);
                  setShowChat(false);
                }}
                screen={screen}
                onBack={() => setShowChat(false)}
                onToggleTheme={toggleTheme}
                isDetailsActive={isDetailsActive}
              />
            ) : (
              <div className="h-100 d-flex align-items-center justify-content-center text-muted text-center">
                <div>
                  <h5>Select a conversation to get started</h5>
                  <p>This is your inbox — messages will show here when selected.</p>
                </div>
              </div>
            )}
          </div>
        )}

        {screen === 'desktop' && showAI && (
          <div className="col-md-3 border-start copilot-bg">
            <RightPanel
              onToggle={() => setShowAI(false)}
              onAddToComposer={(msg) => setInputText(msg)}
              setIsDetailsActive={setIsDetailsActive}
            />
          </div>
        )}

        {screen !== 'desktop' && showAI && (
          <div className="copilot-slideover shadow">
            <RightPanel
              onToggle={() => setShowAI(false)}
              onAddToComposer={(msg) => setInputText(msg)}
              setIsDetailsActive={setIsDetailsActive}
            />
          </div>
        )}
      </div>
    </div>
  );
}

import { useState } from 'react';

const suggestions = [
  'Eligibility criteria for Samagama',
  'Stipend and remote internship details',
  'Resume tips for research internships',
  'Mock interview question practice',
  'Career roadmap for CS students'
];

function YakshaPage() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Namaste! I am Yaksha-mini, your AI guide for Samagama. Ask me anything about the program or internship prep.' }
  ]);
  const [input, setInput] = useState('');

  function sendMessage() {
    if (!input.trim()) return;
    const userMessage = { role: 'user', text: input.trim() };
    const aiMessage = {
      role: 'ai',
      text: `That is a great question! Here is a quick response based on Samagama guidance for: "${input.trim()}".`
    };
    setMessages(prev => [...prev, userMessage, aiMessage]);
    setInput('');
  }

  return (
    <div className="yaksha-page">
      <section className="yaksha-hero">
        <div>
          <p className="page-label">Yaksha-mini</p>
          <h1>Your personal AI companion for Samagama.</h1>
          <p>Get instant guidance on internships, resume review, interview prep, and career roadmaps.</p>
        </div>
      </section>

      <div className="chat-layout">
        <aside className="chat-sidebar">
          <div className="sidebar-card">
            <h3>Suggested prompts</h3>
            {suggestions.map(item => (
              <button key={item} onClick={() => setInput(item)}>{item}</button>
            ))}
          </div>
        </aside>

        <div className="chat-panel">
          <div className="chat-window">
            {messages.map((message, index) => (
              <div key={index} className={message.role === 'ai' ? 'chat-bubble ai' : 'chat-bubble user'}>
                <strong>{message.role === 'ai' ? 'Yaksha' : 'You'}</strong>
                <p>{message.text}</p>
              </div>
            ))}
          </div>

          <div className="chat-input-row">
            <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Ask Yaksha anything..." rows="2" />
            <button className="primary-btn" onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YakshaPage;

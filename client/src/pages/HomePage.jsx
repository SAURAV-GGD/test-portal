import { useNavigate } from 'react-router-dom';

const cards = [
  { title: 'Smart FAQ', emoji: '📚', description: 'AI-powered knowledge hub with semantic search, trending questions, smart categories, and instant answers about the Samagama program.', link: '/faq', theme: 'faq', meta: '50+ FAQs · No login needed' },
  { title: 'Doubt Solver', emoji: '💬', description: 'Reddit-style community Q&A with AI hints, upvotes, comment threads, solved badges, and SP Points rewards for helpful answers.', link: '/doubts', theme: 'doubt', meta: '340+ contributors' },
  { title: 'Yaksha-mini', emoji: '✦', description: 'Your personal AI companion — internship guidance, resume review, interview prep, career roadmaps. No sign-in, no waiting.', link: '/yaksha', theme: 'yaksha', meta: 'Powered by Anthropic' }
];

const trending = [
  { text: 'NOC mandatory?', link: '/faq' },
  { text: 'Stipend details', link: '/faq' },
  { text: 'Final year eligible?', link: '/faq' },
  { text: 'Remote available?', link: '/faq' },
  { text: 'Application docs', link: '/faq' },
  { text: 'Best DSA resources', link: '/doubts' },
  { text: 'SOP writing tips', link: '/doubts' },
  { text: 'IIT Ropar interview prep', link: '/doubts' }
];

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <section className="hero-wrap">
        <div className="hero-content">
          <p className="hero-pill"><span className="pdot"></span> Vicharanashala · IIT Ropar Internship Portal</p>
          <h1 className="hero-title">Don't sign in yet.<br /><span className="grad-text">Read first.</span></h1>
          <p className="hero-sub">Almost every question has been asked before — usually by someone else, fifteen minutes earlier. Meet <em>Yaksha</em>. It's been waiting.</p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => navigate('/faq')}>Browse the FAQ →</button>
            <button className="btn-secondary" onClick={() => navigate('/doubts')}>💬 Community Doubts</button>
          </div>
          <div className="stats-bar">
            <div className="stat">
              <span className="stat-num">2,840+</span>
              <span className="stat-label">students helped</span>
            </div>
            <div className="stat">
              <span className="stat-num">9,400+</span>
              <span className="stat-label">doubts solved</span>
            </div>
            <div className="stat">
              <span className="stat-num">340+</span>
              <span className="stat-label">contributors</span>
            </div>
            <div className="stat">
              <span className="stat-num">97%</span>
              <span className="stat-label">AI accuracy</span>
            </div>
          </div>
        </div>
      </section>

      <div className="sp-card">
        <div className="sp-left">
          <div className="sp-orb">⚡</div>
          <div>
            <h3>SP Points — Student Reputation</h3>
            <p>Earn SP by answering doubts, helping peers, and daily contributions</p>
          </div>
        </div>
        <div className="sp-breakdown">
          <div className="sp-item">
            <strong style={{ color: '#c4b5fd' }}>+10</strong>
            <small>Accepted answer</small>
          </div>
          <div className="sp-item">
            <strong style={{ color: '#fbbf24' }}>+7</strong>
            <small>Highly useful</small>
          </div>
          <div className="sp-item">
            <strong style={{ color: '#34d399' }}>+3</strong>
            <small>Daily streak</small>
          </div>
          <div className="sp-item">
            <strong style={{ color: '#f87171' }}>−5</strong>
            <small>Spam/toxic</small>
          </div>
        </div>
        <button className="btn-secondary">Sign in to view your SP →</button>
      </div>

      <section className="feature-grid">
        {cards.map(card => (
          <article key={card.title} className={`feature-card theme-${card.theme}`} onClick={() => navigate(card.link)}>
            <div className="card-icon">{card.emoji}</div>
            <h2>{card.title}</h2>
            <p>{card.description}</p>
            <div className="card-footer">
              <small>{card.meta}</small>
              <span className="card-arr">→</span>
            </div>
          </article>
        ))}
      </section>

      <div className="trending-section">
        <p className="trending-label">🔥 Trending today</p>
        <div className="trend-pills">
          {trending.map(item => (
            <button key={item.text} className="trend-pill" onClick={() => navigate(item.link)}>
              {item.text}
            </button>
          ))}
        </div>
      </div>

      <div className="footer-section">
        <p>Already applied? <button className="link-btn" onClick={() => navigate('/faq')}>Sign in here →</button></p>
        <p className="footer-meta">samagama.in · Vicharanashala · IIT Ropar · v3.2</p>
      </div>
    </div>
  );
}

export default HomePage;

import { useEffect, useMemo, useState } from 'react';
import { fetchFaq } from '../api';

const categories = [
  { key: 'all', label: 'All' },
  { key: 'eligibility', label: 'Eligibility' },
  { key: 'process', label: 'Process' },
  { key: 'stipend', label: 'Stipend' },
  { key: 'docs', label: 'Documents' },
  { key: 'timeline', label: 'Timeline' },
  { key: 'certificate', label: 'Certificate' },
  { key: 'remote', label: 'Remote' },
  { key: 'fee', label: 'Fees' }
];

const faqCategoryLabels = {
  eligibility: 'Eligibility',
  process: 'Process',
  stipend: 'Stipend',
  docs: 'Documents',
  timeline: 'Timeline',
  certificate: 'Certificate',
  remote: 'Remote',
  fee: 'Fees'
};

function FaqPage() {
  const [faq, setFaq] = useState([]);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedCat, setExpandedCat] = useState({});
  const [expandedItem, setExpandedItem] = useState({});

  useEffect(() => {
    fetchFaq().then(setFaq);
  }, []);

  const filtered = useMemo(() => {
    let items = faq;
    if (activeCategory !== 'all') {
      items = items.filter(item => item.cat === activeCategory);
    }
    if (search.trim()) {
      const query = search.toLowerCase();
      items = items.filter(item => item.q.toLowerCase().includes(query) || item.a.toLowerCase().includes(query));
    }
    return items;
  }, [faq, activeCategory, search]);

  const grouped = useMemo(() => {
    const groups = {};
    filtered.forEach(item => {
      if (!groups[item.cat]) groups[item.cat] = [];
      groups[item.cat].push(item);
    });
    return groups;
  }, [filtered]);

  const categoriesToShow = useMemo(() => {
    return Object.entries(grouped).map(([cat, items]) => ({ key: cat, label: faqCategoryLabels[cat] || cat, items }));
  }, [grouped]);

  return (
    <div className="faq-page">
      <section className="faq-hero">
        <p className="page-label">Knowledge Hub</p>
        <h1>Every question, <span>answered.</span></h1>
        <p>Search the most complete FAQ database for the Samagama internship program.</p>
      </section>

      <div className="faq-controls">
        <div className="search-box">
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search — stipend, NOC, certificate, remote..." />
        </div>
        <select value={activeCategory} onChange={e => setActiveCategory(e.target.value)}>
          {categories.map(c => (
            <option key={c.key} value={c.key}>{c.label}</option>
          ))}
        </select>
      </div>

      <div className="faq-grid">
        <aside className="faq-sidebar">
          <p className="sidebar-label">Categories</p>
          {categories.slice(1).map(category => (
            <button
              key={category.key}
              className={activeCategory === category.key ? 'sidebar-item active' : 'sidebar-item'}
              onClick={() => setActiveCategory(category.key)}
            >
              {category.label}
            </button>
          ))}
        </aside>
        <section className="faq-groups">
          {categoriesToShow.length === 0 ? (
            <div className="faq-empty">No FAQ entries match your search yet. Try another keyword or ask Yaksha-mini.</div>
          ) : categoriesToShow.map((group, gi) => (
            <div key={group.key} className="faq-group">
              <button 
                className="group-header" 
                onClick={() => setExpandedCat(prev => ({ ...prev, [group.key]: !prev[group.key] }))}
              >
                <div>
                  <span>{group.label}</span>
                  <small>{group.items.length} question{group.items.length > 1 ? 's' : ''}</small>
                </div>
                <span>{expandedCat[group.key] ? '▲' : '▼'}</span>
              </button>
              <div className={expandedCat[group.key] ? 'group-body open' : 'group-body'}>
                {group.items.map(item => (
                  <article key={item.id} className={expandedItem[item.id] ? 'faq-item active' : 'faq-item'}>
                    <button 
                      className="faq-question" 
                      onClick={() => setExpandedItem(prev => ({ ...prev, [item.id]: !prev[item.id] }))}
                    >
                      <span>{item.q}</span>
                      <span>▼</span>
                    </button>
                    <div className={expandedItem[item.id] ? 'faq-answer open' : 'faq-answer'}>
                      <p>{item.a}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>

      <div className="faq-footer-card">
        <div>
          <h3>Didn't find your answer?</h3>
          <p>If the FAQ doesn't cover it yet, ask Yaksha-mini. We'll help you with the right internship guidance or route your question to the community.</p>
        </div>
        <a href="/yaksha">Ask Yaksha-mini →</a>
      </div>
    </div>
  );
}

export default FaqPage;

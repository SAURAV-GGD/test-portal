const express = require('express');
const cors = require('cors');
const { faqData, doubtPosts } = require('./data');

const app = express();
app.use(cors());
app.use(express.json());

let posts = [...doubtPosts];

app.get('/api/faq', (req, res) => {
  res.json(faqData);
});

app.get('/api/doubts', (req, res) => {
  const role = req.query.role || 'intern';
  if (role === 'admin') {
    return res.json(posts);
  }
  const visible = posts.filter(post => post.status === 'approved');
  res.json(visible);
});

app.post('/api/doubts', (req, res) => {
  const { title, body, tags, user } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const newPost = {
    id: Date.now(),
    title,
    body: body || '',
    tags: tags && tags.length ? tags : ['Other'],
    votes: 1,
    status: 'pending',
    solved: false,
    user: user || 'Anonymous',
    time: 'just now',
    answers: []
  };
  posts.unshift(newPost);
  res.status(201).json(newPost);
});

app.post('/api/doubts/:id/approve', (req, res) => {
  const id = Number(req.params.id);
  const post = posts.find(p => p.id === id);
  if (!post) return res.status(404).json({ error: 'Doubt not found' });
  post.status = 'approved';
  res.json(post);
});

app.post('/api/doubts/:id/reject', (req, res) => {
  const id = Number(req.params.id);
  const post = posts.find(p => p.id === id);
  if (!post) return res.status(404).json({ error: 'Doubt not found' });
  post.status = 'rejected';
  res.json(post);
});

app.post('/api/doubts/:id/answer', (req, res) => {
  const id = Number(req.params.id);
  const { user, text } = req.body;
  const post = posts.find(p => p.id === id);
  if (!post) return res.status(404).json({ error: 'Doubt not found' });
  if (post.status !== 'approved') return res.status(400).json({ error: 'Cannot answer unapproved doubt' });
  const answer = {
    id: Date.now(),
    user: user || 'Anonymous',
    text,
    time: 'just now'
  };
  post.answers.push(answer);
  res.json(answer);
});

app.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});

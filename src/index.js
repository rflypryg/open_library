const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// 🔍 POST /search (dari body JSON)
app.post('/search', async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required in the request body' });
  }
  try {
    const response = await axios.get(`https://openlibrary.org/search.json?title=${encodeURIComponent(title)}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch from Open Library' });
  }
});

// 🔍 GET /search?title=...
app.get('/search', async (req, res) => {
  const { title } = req.query;
  if (!title) {
    return res.status(400).json({ error: 'Title is required in the query parameters' });
  }
  try {
    const response = await axios.get(`https://openlibrary.org/search.json?title=${encodeURIComponent(title)}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch from Open Library' });
  }
});

// 🔹 GET Method → /work?id=OL45804W
app.get('/work', async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: 'Work ID is required in query parameters' });
  }

  try {
    const response = await axios.get(`https://openlibrary.org/works/${encodeURIComponent(id)}.json`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch from Open Library Works API' });
  }
});

// 🔹 POST Method → /work with body: { "id": "OL45804W" }
app.post('/work', async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ error: 'Work ID is required in request body' });
  }

  try {
    const response = await axios.get(`https://openlibrary.org/works/${encodeURIComponent(id)}.json`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch from Open Library Works API' });
  }
});

app.get('/mybooks', async (req, res) => {
  const { username, shelf } = req.query;
  if (!username || !shelf) {
    return res.status(400).json({ error: 'Username and shelf are required in query parameters' });
  }

  try {
    const response = await axios.get(`https://openlibrary.org/people/${encodeURIComponent(username)}/books/${encodeURIComponent(shelf)}.json`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from Open Library' });
  }
});

// 🔹 POST Method → /mybooks with body: { "username": "mekBot", "shelf": "want-to-read" }
app.post('/mybooks', async (req, res) => {
  const { username, shelf } = req.body;
  if (!username || !shelf) {
    return res.status(400).json({ error: 'Username and shelf are required in request body' });
  }

  try {
    const response = await axios.get(`https://openlibrary.org/people/${encodeURIComponent(username)}/books/${encodeURIComponent(shelf)}.json`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from Open Library' });
  }
});

// 🔹 GET Method → /author?id=OL23919A
app.get('/author', async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: 'Author ID is required in query parameters' });
  }

  try {
    const response = await axios.get(`https://openlibrary.org/authors/${encodeURIComponent(id)}.json`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch author data from Open Library' });
  }
});

// 🔹 POST Method → /author with body: { "id": "OL23919A" }
app.post('/author', async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ error: 'Author ID is required in request body' });
  }

  try {
    const response = await axios.get(`https://openlibrary.org/authors/${encodeURIComponent(id)}.json`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch author data from Open Library' });
  }
});

// 🔹 GET Method → /subject?name=love
app.get('/subject', async (req, res) => {
  const { name } = req.query;
  if (!name) {
    return res.status(400).json({ error: 'Subject name is required in query parameters' });
  }

  try {
    const response = await axios.get(`https://openlibrary.org/subjects/${encodeURIComponent(name)}.json`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch subject data from Open Library' });
  }
});

// 🔹 POST Method → /subject with body: { "name": "love" }
app.post('/subject', async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Subject name is required in request body' });
  }

  try {
    const response = await axios.get(`https://openlibrary.org/subjects/${encodeURIComponent(name)}.json`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch subject data from Open Library' });
  }
});

// 🔹 GET Method → /search-inside?hostname=...&item_id=...&doc=...&path=...&q=...
app.get('/search-inside', async (req, res) => {
  const { hostname, item_id, doc, path, q } = req.query;
  if (!hostname || !item_id || !doc || !path || !q) {
    return res.status(400).json({ error: 'Missing required query parameters' });
  }

  try {
    const url = `https://${hostname}/fulltext/inside.php?item_id=${encodeURIComponent(item_id)}&doc=${encodeURIComponent(doc)}&path=${encodeURIComponent(path)}&q=${encodeURIComponent(q)}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from Open Library Search Inside API' });
  }
});

// 🔹 POST Method → /search-inside with body: { "hostname": "...", "item_id": "...", "doc": "...", "path": "...", "q": "..." }
app.post('/search-inside', async (req, res) => {
  const { hostname, item_id, doc, path, q } = req.body;
  if (!hostname || !item_id || !doc || !path || !q) {
    return res.status(400).json({ error: 'Missing required fields in request body' });
  }

  try {
    const url = `https://${hostname}/fulltext/inside.php?item_id=${encodeURIComponent(item_id)}&doc=${encodeURIComponent(doc)}&path=${encodeURIComponent(path)}&q=${encodeURIComponent(q)}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from Open Library Search Inside API' });
  }
});

// 🔹 GET Method → /read?id_type=isbn&id_value=0596156715
app.get('/read', async (req, res) => {
  const { id_type, id_value } = req.query;
  if (!id_type || !id_value) {
    return res.status(400).json({ error: 'id_type and id_value are required in query parameters' });
  }

  try {
    const url = `https://openlibrary.org/api/volumes/brief/${encodeURIComponent(id_type)}/${encodeURIComponent(id_value)}.json`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from Open Library Read API' });
  }
});

// 🔹 POST Method → /read with body: { "id_type": "isbn", "id_value": "0596156715" }
app.post('/read', async (req, res) => {
  const { id_type, id_value } = req.body;
  if (!id_type || !id_value) {
    return res.status(400).json({ error: 'id_type and id_value are required in request body' });
  }

  try {
    const url = `https://openlibrary.org/api/volumes/brief/${encodeURIComponent(id_type)}/${encodeURIComponent(id_value)}.json`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from Open Library Read API' });
  }
});

// 🔹 GET Method → /cover?type=isbn&id=0451526538&size=L
app.get('/cover', async (req, res) => {
  const { type, id, size } = req.query;
  if (!type || !id) {
    return res.status(400).json({ error: 'Type and ID are required in query parameters' });
  }

  const coverUrl = `https://covers.openlibrary.org/b/${encodeURIComponent(type)}/${encodeURIComponent(id)}-${size || 'L'}.jpg`;
  res.json({ url: coverUrl });
});

// 🔹 POST Method → /cover with body: { "type": "isbn", "id": "0451526538", "size": "L" }
app.post('/cover', async (req, res) => {
  const { type, id, size } = req.body;
  if (!type || !id) {
    return res.status(400).json({ error: 'Type and ID are required in request body' });
  }

  const coverUrl = `https://covers.openlibrary.org/b/${encodeURIComponent(type)}/${encodeURIComponent(id)}-${size || 'L'}.jpg`;
  res.json({ url: coverUrl });
});

// 🔹 GET Method → /recent-changes?limit=5&bot=false
app.get('/recent-changes', async (req, res) => {
  const { limit, bot, kind } = req.query;
  const params = new URLSearchParams();

  if (limit) params.append('limit', limit);
  if (bot) params.append('bot', bot);
  if (kind) params.append('kind', kind);

  const url = `https://openlibrary.org/recentchanges.json?${params.toString()}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from Open Library Recent Changes API' });
  }
});

// 🔹 POST Method → /recent-changes with body: { "limit": 5, "bot": "false", "kind": "edit" }
app.post('/recent-changes', async (req, res) => {
  const { limit, bot, kind } = req.body;
  const params = new URLSearchParams();

  if (limit) params.append('limit', limit);
  if (bot) params.append('bot', bot);
  if (kind) params.append('kind', kind);

  const url = `https://openlibrary.org/recentchanges.json?${params.toString()}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from Open Library Recent Changes API' });
  }
});

// 🔹 GET Method → /lists?user=mekBot
app.get('/lists', async (req, res) => {
  const { user } = req.query;
  if (!user) {
    return res.status(400).json({ error: 'Parameter "user" diperlukan (contoh: ?user=mekBot)' });
  }

  const url = `https://openlibrary.org/people/${encodeURIComponent(user)}/lists.json`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil data dari Open Library Lists API' });
  }
});

// 🔹 POST Method → /lists with body: { "user": "mekBot" }
app.post('/lists', async (req, res) => {
  const { user } = req.body;
  if (!user) {
    return res.status(400).json({ error: 'Parameter "user" diperlukan di body request' });
  }

  const url = `https://openlibrary.org/people/${encodeURIComponent(user)}/lists.json`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil data dari Open Library Lists API' });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));

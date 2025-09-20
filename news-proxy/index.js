import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Proxy endpoint for NewsAPI
app.get('/newsapi', async (req, res) => {
  const apiKey = 'e6e3334a36fc4ce3b63e879efc3800dd'; // Your NewsAPI key
  const baseUrl = 'https://newsapi.org/v2/everything';
  const params = {
    q: req.query.q || 'India AND (geopolitics OR China OR Pakistan OR border OR diplomacy OR trade war OR LAC OR Kashmir OR QUAD OR BRICS OR bilateral OR strategic OR security OR defense)',
    language: 'en',
    sortBy: 'publishedAt',
    pageSize: 30,
    sources: req.query.sources || 'the-times-of-india,the-hindu,reuters,bbc-news,cnn,al-jazeera-english,associated-press,the-wall-street-journal',
    from: req.query.from || new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    to: req.query.to || new Date().toISOString(),
    apiKey
  };

  try {
    const response = await axios.get(baseUrl, { params });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`News proxy server running on http://localhost:${PORT}`);
});

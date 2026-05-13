const express = require('express');
const axios = require('axios');
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.get('/proxy', async (req, res) => {
  try {
    const path = req.query.path || '/v5/execution/list';
    const query = req.query.query || '';
    const url = `https://api.bybit.com${path}?${query}`;

    const headers = {};
    Object.keys(req.headers).forEach(key => {
      if (key.startsWith('x-bapi')) {
        headers[key] = req.headers[key];
      }
    });

    const response = await axios.get(url, { headers });
    res.json(response.data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));

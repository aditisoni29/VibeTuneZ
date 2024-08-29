const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/your-endpoint', (req, res) => {
  res.json({ message: 'This is CORS-enabled for all origins!' });
});

app.listen(3000, () => {
  console.log('CORS-enabled web server listening on port 3000');
});
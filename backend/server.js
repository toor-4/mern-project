const express = require('express');

const app = express();

const port = process.env.PORT || 3600;

app.get('/', function (req, res) {
  console.log(req.method);
  res.json({ message: 'Hello from Node.js' });
});

app.listen(port, () => {
  console.log(`server is listening on http://localhost:${port}`);
});

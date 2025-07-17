
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/auth', (req, res) => {
  const { client_id, redirect_uri, state } = req.query;
  const code = 'abc123';
  const redirectUrl = `${redirect_uri}?code=${code}&state=${state}`;
  console.log('Login -> Redirect:', redirectUrl);
  res.redirect(redirectUrl);
});

app.post('/token', (req, res) => {
  const { grant_type, code, redirect_uri, client_id, client_secret } = req.body;

  if (code !== 'abc123') {
    return res.status(400).json({ error: 'invalid_grant' });
  }

  res.json({
    token_type: "Bearer",
    access_token: "test_access_token",
    refresh_token: "test_refresh_token",
    expires_in: 3600
  });
});

app.listen(PORT, () => {
  console.log(`OAuth server running on port ${PORT}`);
});

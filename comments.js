// Create web server
// Load comments
// Add new comment
// Save comments
// Load comments
// Return comments
// Listen to port

const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

const comments = require('./comments.json');

const server = http.createServer((req, res) => {
  const path = url.parse(req.url).pathname;
  const query = url.parse(req.url).query;

  if (path === '/comments') {
    if (req.method === 'POST') {
      let body = '';
      req.on('data', (data) => {
        body += data;
      });
      req.on('end', () => {
        const comment = qs.parse(body).comment;
        comments.push(comment);
        fs.writeFile('./comments.json', JSON.stringify(comments), 'utf8', (err) => {
          if (err) {
            res.writeHead(500);
            res.end('Server Error!');
            return;
          }
          res.writeHead(200);
          res.end('Success!');
        });
      });
    } else if (req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(comments));
    }
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
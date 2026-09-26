const http = require('http');

let storedData = [];

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/' && req.method === 'GET') {
    res.statusCode = 200;
    res.end("welcome to home page ");
  } 
  else if (req.url === '/users' && req.method === 'GET') {
    res.statusCode = 201;
    res.end('Users list');
  }
  else if (req.url === '/product' && req.method === 'GET') {
    res.statusCode = 200;
    res.end('choose any product do you want');
  }
  else if (req.url === '/data' && req.method === 'POST') {
    let body = '';

    req.on('data', (part) => {
      body += part;
    });

    req.on('end', () => {
      storedData.push(body);

      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 201;
      res.end(JSON.stringify({
        message: 'Data succesed',
        receivedData: body
      }));
    });
  }
  else {
    res.statusCode = 404;
    res.end("this page invalid");
  }
});

server.listen(4000, () => {
  console.log('the server work on http://localhost:4000');
});
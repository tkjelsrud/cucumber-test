const http = require('http');
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Serve static files from the "css" folder
app.use('/css', express.static(path.join(__dirname, 'css')));

//const server = http.createServer((req, res) => {
//  if (req.url === '/report') {
//

app.get('/features/:featureName', (req, res) => {
  const featureName = req.params.featureName;
  const featurePath = path.join(__dirname, 'features', featureName);

  fs.readFile(featurePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(data);
  });
});

app.get('/report', (req, res) => {
  const filePath = path.join(__dirname, 'reports', 'report.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
      return;
    }

    const jsonData = JSON.parse(data);

    //res.writeHead(200, { 'Content-Type': 'application/json' });
    //res.end(jsonData);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cucumber JSON Report</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            margin: 20px;
          }
          pre {
            white-space: pre-wrap;
          }
        </style>
        <link rel="stylesheet" href="/css/style.css"></link>
      </head>
      <body>
        <h1>Cucumber JSON Report</h1>
          ${jsonData.map(feature => feature.elements.map(element => `
            <div class="feature">${feature.name}</div>
            <div class="featureUri"><a href="${feature.uri}">${feature.uri}</a></div>

            ${element.steps.map(step => `
              <div class="step ${step.result.status}">
                ${step.keyword} 
                ${(step.name ? step.name : "")}
                ${step.result.error_message ? `<div class="error">${step.result.error_message}</div>`: ``}
              </div>
            `).join('')}

          `)).join('')}
          </tbody>
        </table>
      </body>
      </html>
    `);
    });
});

app.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end("Hello, World!");
});

// Set up the server
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
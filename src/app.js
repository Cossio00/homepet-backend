const express = require("express");
const app = express();
const fs = require('fs');
const https = require('https');

const routes = require('./routes');

const port = 3000;
const httpsPort = 3001;

app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`API Rodando na porta: ${port}`);
});
https.createServer({
    cert: fs.readFileSync('./src/SSL/code.crt'),
    key: fs.readFileSync('./src/SSL/code.key')
}, app).listen(httpsPort, ()=> console.log(`Rodando em HTTPS na rota ${httpsPort}`));
const express = require("express");
const app = express();
const fs = require('fs');
const https = require('https');
const cors = require('cors');
const routes = require('./routes');
const port = 3010;
const httpsPort = 3011;

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(port, () => {
  console.log(`API Rodando na porta: ${port}`);
});
https.createServer({
    cert: fs.readFileSync('./src/SSL/code.crt'),
    key: fs.readFileSync('./src/SSL/code.key')
}, app).listen(httpsPort, ()=> console.log(`Rodando em HTTPS na rota ${httpsPort}`));
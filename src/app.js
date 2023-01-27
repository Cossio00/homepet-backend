const express = require('express');
const router = require('./routes.js');
const fs = require('fs');
const https = require('https');
const cors = require('cors');

const app = express()
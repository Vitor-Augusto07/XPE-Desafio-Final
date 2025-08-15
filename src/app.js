const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const clienteRoutes = require('./routes/clienteRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/clientes', clienteRoutes);

module.exports = app;

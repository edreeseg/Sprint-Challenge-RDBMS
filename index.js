const express = require('express');
const server = express();
const cors = require('cors');

const port = process.env.PORT || 5000;
server.use(express.json());
server.use(cors());
const projectRoutes = require('./routes/projectRoutes');
const actionRoutes = require('./routes/actionRoutes');

server.use('/projects', projectRoutes);
server.use('/actions', actionRoutes);

server.listen(port, () => console.log(`Server listening on port ${port}.`));

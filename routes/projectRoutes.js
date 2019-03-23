const express = require('express');
const router = express.Router();
const db = require('../data/helpers');

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.getProject(id)
    .then(project => res.send({ project }))
    .catch(error => {
      if (error === 404)
        res.status(404).json({ error: 'No project with that ID found.' });
      else res.status(500).json({ error });
    });
});

router.post('/', (req, res) => {
  const { name, description, completed } = req.body;
  const project = { name, description, completed };
  db.addProject(project)
    .then(id => res.status(201).json({ id }))
    .catch(error => {
      if (error === 400)
        return res
          .status(400)
          .json({ error: 'Project must include name and description keys.' });
      else res.status(500).json({ error });
    });
});

module.exports = router;

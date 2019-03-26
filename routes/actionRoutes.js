const express = require('express');
const router = express.Router();
const db = require('../data/helpers');

router.post('/', (req, res) => {
  const { description, notes, completed, project_id } = req.body;
  const action = { description, notes, completed, project_id };
  db.addAction(action)
    .then(id => res.status(201).json({ id }))
    .catch(error => {
      switch (error) {
        case 'keys':
          return res.status(400).json({
            error:
              'Action must include description, notes, and project_id keys.',
          });
        case 'foreign':
          return res.status(422).json({
            error:
              'project_id key must reference a currently existing project.',
          });
        case 'unique':
          return res
            .status(400)
            .json({ error: 'Action description must be unique.' });
        default:
          res.status(500).json({ error });
      }
    });
});

module.exports = router;

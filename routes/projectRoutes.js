const express = require('express');
const router = express.Router();
const db = require('../data/helpers');

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.getProject(id)
    .then(project => {
      console.log(project);
      res.send('test');
    })
    .catch(error => {
      console.log(error);
      res.send('error');
    });
});

module.exports = router;

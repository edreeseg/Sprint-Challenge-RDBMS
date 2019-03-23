const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

module.exports = {
  addProject,
  addAction,
  getProject,
};

function addProject(project) {
  return new Promise(async (resolve, reject) => {
    const { name, description, completed } = project;
    if (!name || !description) reject(400);
    db('projects')
      .insert({ name, description, completed: completed ? completed : false })
      .then(id => resolve(id[0]))
      .catch(error => reject(error));
  });
}

function addAction(action) {
  return new Promise(async (resolve, reject) => {
    const { description, notes, completed } = project;
    if (!description || !notes) reject(400);
    db('actions')
      .insert({ description, notes, completed: completed ? completed : false })
      .then(id => resolve(id))
      .catch(error => {
        if (error.errno === 19) reject(404);
        else reject(error);
      });
  });
}

function getProject(id) {
  return new Promise(async (resolve, reject) => {
    try {
      let project = await db('projects').where({ id });
      project = project[0];
      if (!project) reject(404);
      const actions = await db('actions').where({ project_id: project.id });
      project.actions = actions;
      resolve(project);
    } catch (err) {
      reject(err);
    }
  });
}

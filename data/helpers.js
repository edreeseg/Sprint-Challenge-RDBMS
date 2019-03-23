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
    if (!name || !description) reject('keys');
    db('projects')
      .insert({ name, description, completed: completed ? completed : false })
      .then(id => resolve(id[0]))
      .catch(error => {
        if (error.message.includes('UNIQUE')) reject('unique');
        else reject(error);
      });
  });
}

function addAction(action) {
  return new Promise(async (resolve, reject) => {
    const { description, notes, completed, project_id } = action;
    if (!description || !notes || !project_id) reject('keys');
    db('actions')
      .insert({
        description,
        notes,
        completed: completed ? completed : false,
        project_id,
      })
      .then(id => resolve(id[0]))
      .catch(error => {
        if (error.message.includes('FOREIGN')) reject('foreign');
        else if (error.message.includes('UNIQUE')) reject('unique');
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
      project.completed = project.completed === 1 ? true : false;
      resolve(project);
    } catch (err) {
      reject(err);
    }
  });
}

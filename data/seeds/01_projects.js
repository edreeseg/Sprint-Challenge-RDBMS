exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('projects')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('projects').insert([
        {
          id: 1,
          name: 'Project1',
          description: 'The first test project.',
          completed: false,
        },
        {
          id: 2,
          name: 'Project2',
          description: 'The second test project.',
          completed: false,
        },
        {
          id: 3,
          name: 'Project3',
          description: 'The third test project.',
          completed: false,
        },
      ]);
    });
};

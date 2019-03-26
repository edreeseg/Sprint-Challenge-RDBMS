exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('actions')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('actions').insert([
        {
          id: 1,
          description: 'Finish an action for first test project',
          notes: 'This is the first action for test project one.',
          completed: false,
          project_id: 1,
        },
        {
          id: 2,
          description: 'Finish an action for second test project',
          notes: 'This is the first action for test project two.',
          completed: false,
          project_id: 2,
        },
        {
          id: 3,
          description: 'Finish an action for third test project',
          notes: 'This is the first action for test project three.',
          completed: false,
          project_id: 3,
        },
      ]);
    });
};

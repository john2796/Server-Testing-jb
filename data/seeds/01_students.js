
exports.seed = knex => knex('students').truncate()
  .then(() => knex('students').insert([
    { name: 'jb 1', cohort: 'cohort 1' }, { name: 'jb 2', cohort: 'cohort 2' }, { name: 'jb 3', cohort: 'cohort 3' },
  ]));

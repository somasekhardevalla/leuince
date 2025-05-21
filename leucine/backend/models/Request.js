const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Request',
  tableName: 'requests',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    accessType: {
      type: 'varchar',
      enum: ['Read', 'Write', 'Admin'],
    },
    reason: {
      type: 'text',
    },
    status: {
      type: 'varchar',
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending',
    },
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: 'User',
    },
    software: {
      type: 'many-to-one',
      target: 'Software',
    },
  },
});

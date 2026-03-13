'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE users
      MODIFY COLUMN status ENUM('active','inactive','unapproved')
      DEFAULT 'unapproved';
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE users
      MODIFY COLUMN status ENUM('active','inactive')
      DEFAULT 'active';
    `);
  }
};

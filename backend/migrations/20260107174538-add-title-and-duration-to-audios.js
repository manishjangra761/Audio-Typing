'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Add 'title' column
    await queryInterface.addColumn('audios', 'title', {
      type: Sequelize.STRING,
      allowNull: false, // set to true if title can be empty
      after : 'correct_text'
    });

    // Add 'duration' column
    await queryInterface.addColumn('audios', 'duration', {
      type: Sequelize.INTEGER, // store duration in seconds (or change if needed)
      allowNull: true,
      defaultValue: 0, // optional default
      after : 'title'
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove columns if rolling back
    await queryInterface.removeColumn('audios', 'title');
    await queryInterface.removeColumn('audios', 'duration');
  }
};

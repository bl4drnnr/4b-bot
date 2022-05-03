'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.createTable('users', {
      id: Sequelize.INTEGER
    });
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.dropTable('users');
  }
};

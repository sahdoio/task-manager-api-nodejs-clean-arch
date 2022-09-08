'use strict';

const bcrypt = require('bcrypt')

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{
      email: 'lucassahdo@gmail.com',
      firstName: 'Lucas',
      lastName: 'Sahdo',
      password: await bcrypt.hashSync('123456', 10),
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};

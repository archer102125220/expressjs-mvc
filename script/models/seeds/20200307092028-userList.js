'use strict';//seeds

import bcrypt from 'bcrypt';
import uuid from 'uuid/v4';

export default {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('userLists', [{
      account: 'admin',
      password: await bcrypt.hash('123', bcrypt.genSaltSync(8)),
      email: 'example@example.com',
      account_Id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};

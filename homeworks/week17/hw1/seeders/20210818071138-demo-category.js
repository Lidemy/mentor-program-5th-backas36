'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   return queryInterface.bulkInsert('Categories', [{
          category_name: 'JAVASCRIPT',
          is_deleted: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          category_name: 'PHP',
          is_deleted: false,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Categories', null, {});
  }
};

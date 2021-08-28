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
    return queryInterface.bulkInsert('Articles', [
      {
        title: 'This is Frist Article Title',
        content: `Suppose we want to insert some data into a few tables by default. If we follow up on previous example we can consider creating a demo user for User table.

  To manage all data migrations you can use seeders. Seed files are some change in data that can be used to populate database table with sample data or test data.

  Let's create a seed file which will add a demo user to our User table.`,
        is_deleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 1,
        CategoryId:1
      },
      {
          title: 'This is Second Article Title',
        content: `is_deleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      UserId: 1,
      CategoryId:1`,
        is_deleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 1,
        CategoryId:2
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
     return queryInterface.bulkDelete('Articles', null, {});
  }
};

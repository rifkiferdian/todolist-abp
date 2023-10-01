'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('activities', [{
      title: 'Tugas Kuliah',
      email: 'rifki@gmail.com',
      created_at: new Date(),
      updated_at: new Date()
    },{
      title: 'Tugas Komunitas',
      email: 'ahmad@gmail.com',
      created_at: new Date(),
      updated_at: new Date()
    }])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('activities', null, {});
  }
};

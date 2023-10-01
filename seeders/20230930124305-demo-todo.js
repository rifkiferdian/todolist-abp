'use strict';

const { activities } = require('../models');

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
    return queryInterface.bulkInsert('todos', [{
      activity_group_id: 1,
      title: 'kerjakan pr matematika',
      priority: 'very-high',
      is_active: 1,
      created_at: new Date(),
      updated_at: new Date(),
    },{
      activity_group_id: 1,
      title: 'kerjakan pr BI',
      priority: 'very-high',
      is_active: 1,
      created_at: new Date(),
      updated_at: new Date(),
    }])

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('todos', null, {});
  }
};

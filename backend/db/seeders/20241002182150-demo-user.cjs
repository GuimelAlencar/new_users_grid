'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      username: "Mateus",
      email: "mateus@mail.com",
      phone: "123230258",
      birthDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      username: "Marcos",
      email: "marcos@mail.com",
      phone: "123230258",
      birthDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      username: "Lucas",
      email: "lucas@mail.com",
      phone: "123230258",
      birthDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      username: "João",
      email: "joao@mail.com",
      phone: "123230258",
      birthDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};

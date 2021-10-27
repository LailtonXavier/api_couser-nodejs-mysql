"use strict";module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.changeColumn(
    'alunos',
    'email',
    {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
  ),

  down: () => { },
};
/**
 *  pegando o nome da table e coluna, e fazendo as edições
 */

const bcryptjs = require('bcryptjs');

module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert(
    'users',
    [
      {
        name: 'Lailton',
        email: 'laitlon@gmail.com',
        password_hash: await bcryptjs.hash('123456', 8),
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        name: 'Roberto',
        email: 'roberto@gmail.com',
        password_hash: await bcryptjs.hash('123456', 8),
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        name: 'Joana',
        email: 'joana@gmail.ccom',
        password_hash: await bcryptjs.hash('123456', 8),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {},
  ),

  down: () => { },
};

// usando o bcryptjs para zerar o hash da senha
// senha e o tamanho
// npx sequelize db:seed:all

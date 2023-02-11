'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Unidades',
        'rutaId',
        {
          type: Sequelize.DataTypes.INTEGER,
          //establecer la relación de la tabla y la llave primaria
          references: {
            model: 'Rutas',
            key: 'id'
          },
          //integridad referencial
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          defaultValue: null,
          after: 'numunidad'
        },
      ),
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Unidades', 'rutaId')
    ]);
  }
};

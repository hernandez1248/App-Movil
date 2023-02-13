'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Schedules.belongsTo(models.Unidades,
        {
          as: 'unit', // alias para la relacion 
          foreignKey: 'unitId', // pf en products
        });
    }
  }

  Schedule.init({
    hora: DataTypes.STRING,
    unitId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Schedule',
  });
  return Schedule;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Unidades extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Unidades.init({
    numunidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'El campo es obligatorio',
        },
        isNumeric: {
          msg: 'Número inválido.',
        },
      },
    },
    placas: {
      type: DataTypes.STRING,
      /*allowNull: false,
      validate: {
        notNull: {
          msg: 'El campo es obligatorio',
        },
        is: {
          arg: /^[A-Z]{3}[-][0-9]{3}$/,
          msg: 'Las placas deben ser validas.',
        },
      },*/
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'El nombre es obligatorio',
        },
        is: {
          args: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g,
          msg: 'El nombre debe contener sólo texto.',
        },
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'El campo es obligatorio',
        },
        is: {
          args: /^[0-9]{2}[0-9]{8}$/,
          msg: 'El campo debe contener sólo números y 10 caracteres.',
        },
      },
    },
    vigencialicencia: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'El campo es obligatorio',
        },
        isDate: {
          msg: 'La fecha debe ser valida.',
        },
      },
    }
  }, {
    sequelize,
    modelName: 'Unidades',
  });
  return Unidades;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Usuarios.init({
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
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Este campo es obligatorio',
        },
        len: {
          args: [8, 255],
          msg: 'La contraseña debe contener minimo 8 caracteres',
        }
      },
      /*set(val) {
        //Encriptar el valor de la password antes de guardarlo en la BD
        const secret = process.env.ENCRYPTION_KEY;//usar una clave segura de entorno
        const cipher = crypto.createCipher('aes192', secret);
        let encrypted = cipher.update(val, 'urf8', 'hex');
        encrypted += cipher.final('hex');
        this.setDataValue('password', encrypted);
      },
      get() {
        //Devolver el valor desincriptado al leerlo de la base de datos
        const secret = process.env.ENCRYPTION_KEY;//usar la misma clave de entorno
        const decipher = crypto.createCipher('aes192', secret);
        let decrypted = decipher.update(this.getDataValue('password'), 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
      }*/
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'Este campo es obligatorio',
        },
        isEmail: {
          msg: 'Debe ingresar un email valido',
        }
      }
    },
    /*set(val) {
      //Encriptar el valor de la password antes de guardarlo en la BD
      const secret = process.env.ENCRYPTION_KEY;//usar una clave segura de entorno
      const cipher = crypto.createCipher('aes192', secret);
      let encrypted = cipher.update(val, 'urf8', 'hex');
      encrypted += cipher.final('hex');
      this.setDataValue('email', encrypted);
    },
    get() {
      //Devolver el valor desincriptado al leerlo de la base de datos
      const secret = process.env.ENCRYPTION_KEY;//usar la misma clave de entorno
      const decipher = crypto.createCipher('aes192', secret);
      let decrypted = decipher.update(this.getDataValue('email'), 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      return decrypted;
    }*/
  }, {
    sequelize,
    modelName: 'Usuarios',
  });
  return Usuarios;
};
'use strict';

import {
  Model
} from 'sequelize';

export default (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init({
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    birthDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};
'use strict';

import uuid from 'uuid/v4';
import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const userList = sequelize.define('userList', {
    account: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    account_Id: {
      type: DataTypes.UUID,
      defaultValue: uuid,
    }
  }, {
    instanceMethods: {
      generateHash(password) {
        return bcrypt.hash(password, bcrypt.genSaltSync(8));
      },
      validPassword(password) {
        return bcrypt.compare(password, this.password);
      }
    }
  });
  userList.associate = function (models) {
    // associations can be defined here
  };

  return userList;
};
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
    },
    // references: { //外來鍵 https://itbilu.com/nodejs/npm/EJarwPD8W.html
    //   model: 'User', //資料表名稱
    //   key: 'id' //對應欄位
    // },
  }, {
    // tableName: 'userList',
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
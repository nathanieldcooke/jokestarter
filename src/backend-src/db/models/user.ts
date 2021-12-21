const bcrypt = require('bcryptjs')
import { IUserSecure } from "../../custom-types";
// const path = require('path');
const Sequelize = require('sequelize');
const { DataTypes } = require("sequelize");
'use strict';
module.exports = (sequelize: typeof Sequelize, dataTypes: typeof DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: dataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        min: 4,
        max: 30, 
      }
    },
    hashedPassword: {
      type: dataTypes.STRING,
      allowNull: false,
      validate: {
        min: 60, 
        max: 60
      }
    },

  }, {
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'createdAt', 'updatedAt']
      }
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ['hashedPassword', 'createdAt', 'updatedAt'] }
      },
      loginUser: {
        attributes: {}
      }
    }
  });
  // User.associate = function(models) { // mabey try to destructure other models.
  //   // associations can be defined here
  // };

  User.prototype.toSafeObject = function() { // remember, this cannot be an arrow function
    const { id, username } = this; // context will be the User instance
    return { id, username, errors: [] };
  };

  User.prototype.validatePassword = function (password:string) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  User.getCurrentUserById = async function (id:number|string) {
    return await User.scope('currentUser').findByPk(id);
  };

  User.login = async function ({ username, password }:IUserSecure) {
    const user = await User.scope('loginUser').findOne({
      where: {
        username: username,
      }
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };

  User.signup = async function ({ username, password }:IUserSecure) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      hashedPassword
    });
    return await User.scope('currentUser').findByPk(user.id);
  };
  
  return User;
};
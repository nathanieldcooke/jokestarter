'use strict';

export {}

import { IUserSecure, IUserSignUp } from "../../types/d";


const db = require('./../models')
const bcrypt = require('bcryptjs')
const Sequelize = require('sequelize');
const { DataTypes } = require("sequelize");

module.exports = (sequelize: typeof Sequelize, dataTypes: typeof DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: dataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        min: 4,
        max: 50, 
      }
    },
    email: {
      type: dataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        min: 4,
        max: 50, 
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
  User.associate = function(models: typeof db) { // mabey try to destructure other models.
    const columnMapping1 = {
      through: 'HideList',
      otherKey: 'projectId',
      foreignKey: 'userId'
     }
     User.belongsToMany(models.Project, columnMapping1);

     const columnMapping2 = {
      through: 'Bookmark',
      otherKey: 'projectId',
      foreignKey: 'userId'
     }
     User.belongsToMany(models.Project, columnMapping2);

     const columnMapping3 = {
      through: 'UsersToSupportTier',
      otherKey: 'supportTierId',
      foreignKey: 'userId'
     }
     User.belongsToMany(models.SupportTier, columnMapping3);
  };

  User.prototype.toSafeObject = function() { // remember, this cannot be an arrow function
    const { id, username } = this; // context will be the User instance
    return { id, username };
  };

  User.prototype.validatePassword = function (password:string) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  User.getCurrentUserById = async function (id:number|string) {
    return await User.scope('currentUser').findByPk(id);
  };

  User.getUserId = async function (username:string) {
    const user = await User.findOne({
      where: {
        username
      }
    })
    return user.id
  }

  User.login = async function ({ credential, password }:IUserSecure) {
    let user = await User.scope('loginUser').findOne({
      where: {
        username: credential,
      }
    });

    if (!user) {
      user = await User.scope('loginUser').findOne({
        where: {
          email: credential,
        }
      });
    }
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };

  User.signup = async function ({ username, email, password }:IUserSignUp) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      email,
      hashedPassword
    });
    return await User.scope('currentUser').findByPk(user.id);
  };
  
  return User;
};
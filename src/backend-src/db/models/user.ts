const bcrypt = require('bcryptjs')
import { IUser, IUserSecure } from "../../custom-types";
'use strict';
module.exports = (sequelize:any, DataTypes:any) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        min: 4,
        max: 30, 
      }
    },
    hashedPassword: {
      type: DataTypes.STRING,
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
  User.associate = function(models:any) {
    // associations can be defined here
  };

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
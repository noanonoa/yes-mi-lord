//user MODEL DECLARATION

//DEFINE use CASE
'use strict';  // WHAT IS 'USE STRICT'?
//IMPORT ANY REQUIRED LIBRARIES
const bcrypt = require('bcrypt')
//DECLARE user MODEL FORMAT
module.exports = function(sequelize, DataTypes) {
    //DEFINE user OBJECT
    const user = sequelize.define('user', {
        //EMAIL
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: {
                    msg: 'Invalid email address'
                }
            }
        },
        //NAME
        name: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [1, 99],
                    msg: 'Name must be between 1 and 99 characters'
                }
            }
        },
        //PASSWORD
        password: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [8, 99],
                    msg: 'Password is of incorrect length. Double check character number.'
                }
            }
        }    
    }, 
    {
        //HOOK  (What is hook?)
        hooks: {
            //BEFORE RECORD CREATION
            beforeCreate: function(createdUser, options) {
                //TAKE INPUTED PASSWORD
                if (createdUser && createdUser.password) {
                    //BEFORE 'new' RECORD
                    //HASH PASSWORD
                    let hash = bcrypt.hashSync(createdUser.password, 12)
                    //RETURN NEW PASSWORD AS PASSWORD FOR NEW RECORD
                    createdUser.password = hash;
                }
            }
        }
    });

    user.associate = function(models) {
        //TODO: ANY USER ASSOCIATIONS YOU WANT
    }

    //THIS BLOCK OF CODE IS MIND-BLOWING.  WHAT DOES IT MEAN!?
    //validPassword DEFINITION TO VALIDATE PASSWORD AT USER LOGIN
    user.prototype.validPassword = function(passwordTyped) {
        //TAKE INPUTED PASSWORD AND COMPARE TO HASHED PASSWORD IN USER TABLE
        return bcrypt.compareSync(passwordTyped, this.password);
    }

    //REMOVE PASSWORD BEFORE ANY SERIALIZATION OF User OBJECT
    //REMOVE PASSWORD SETUP BEFORE ADDING
    user.prototype.toJSON = function () {
        let userData = this.get();
        delete userData.password;
        return userData;
    }

    //RETURN USER MODEL
    return user;
};

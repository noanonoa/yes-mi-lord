'use strict';
module.exports = (sequelize, DataTypes) => {
  const teammate = sequelize.define('teammate', {
    name: DataTypes.STRING,
    charId: DataTypes.STRING,
    teamId: DataTypes.INTEGER
  }, {});
  teammate.associate = function(models) {
    // associations can be defined here
    models.teammate.belongsTo(models.team)
  };
  return teammate;
};
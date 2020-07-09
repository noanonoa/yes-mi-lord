'use strict';
module.exports = (sequelize, DataTypes) => {
  const team = sequelize.define('team', {
    comment: DataTypes.TEXT,
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  team.associate = function(models) {
    // associations can be defined here
    models.team.belongsTo(models.user)
    models.team.hasMany(models.teammate)
  };
  return team;
};
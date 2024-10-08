'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bookmarks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      bookmarks.belongsTo(models.users, { foreignKey: 'userId' });
      bookmarks.belongsTo(models.movies, { foreignKey: 'movieId' });
    }
  }
  bookmarks.init({
    movieId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'bookmarks',
  });

  return bookmarks;
};
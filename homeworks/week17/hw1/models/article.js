'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Article.hasMany(models.Comment)
      Article.belongsTo(models.Category)
      Article.belongsTo(models.User)
    }
  };
  Article.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    is_deleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    category_name: { 
      type: DataTypes.STRING, 
      allowNull: false 
    }
  }, {
    tableName: 'category', // Explicitly specify the existing table name 'category'
    timestamps: false // If the table does not have `createdAt` and `updatedAt` columns
  });

  return Category;
};

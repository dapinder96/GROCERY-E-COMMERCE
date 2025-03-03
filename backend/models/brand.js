module.exports = (sequelize, DataTypes) => {
    const Brand = sequelize.define('Brand', {
      id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
      },
      name: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true 
      },
      description: { 
        type: DataTypes.TEXT, 
        allowNull: true 
      }
    }, {
      tableName: 'brand', // Explicitly specify the existing table name 'brand'
      timestamps: false // If the table does not have `createdAt` and `updatedAt` columns
    });
  
    return Brand;
  };
  
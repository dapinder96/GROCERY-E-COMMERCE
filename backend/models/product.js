module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
      id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
      },
      name: { 
        type: DataTypes.STRING, 
        allowNull: false 
      },
      category_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: {
          model: 'Category', 
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      brand_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: {
          model: 'Brand', 
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      price: { 
        type: DataTypes.DECIMAL(10,2), 
        allowNull: false 
      },
      stock: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        defaultValue: 0 
      },
      description: { 
        type: DataTypes.TEXT, 
        allowNull: true 
      }
    }, {
      tableName: 'product', // Explicitly specify the existing table name 'product'
      timestamps: false // If the table does not have `createdAt` and `updatedAt` columns
    });
  
    return Product;
  };
  
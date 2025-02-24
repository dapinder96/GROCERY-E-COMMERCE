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
        allowNull: false 
      },
      brand_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
      },
      price: { 
        type: DataTypes.DECIMAL(10, 2), 

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
      tableName: 'product',
      timestamps: false
    });
  
    return Product;
  };
  

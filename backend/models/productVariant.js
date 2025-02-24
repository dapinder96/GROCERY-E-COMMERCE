module.exports = (sequelize, DataTypes) => {
    const ProductVariant = sequelize.define('ProductVariant', {
      id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
      },
      product_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
      },
      variant_type: { 
        type: DataTypes.STRING, 
        allowNull: false 
      },
      variant_value: { 
        type: DataTypes.STRING, 
        allowNull: false 
      }
    }, {
      tableName: 'product_variant',
      timestamps: false
    });
  
    return ProductVariant;
  };
  

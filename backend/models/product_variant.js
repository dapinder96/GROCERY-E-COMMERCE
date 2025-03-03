module.exports = (sequelize, DataTypes) => {
    const ProductVariant = sequelize.define('ProductVariant', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Product',
          key: 'id'
        },
        onDelete: 'CASCADE'
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
      tableName: 'product_variant', // Explicitly specify the existing table name 'product_variant'
      timestamps: false // If the table does not have `createdAt` and `updatedAt` columns
    });
  
    return ProductVariant;
  };
  
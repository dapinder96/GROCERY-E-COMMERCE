module.exports = (sequelize, DataTypes) => {
    const ProductImage = sequelize.define('ProductImage', {
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
      image_url: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      tableName: 'product_image', // Explicitly specify the existing table name 'product_image'
      timestamps: false // If the table does not have `createdAt` and `updatedAt` columns
    });
  
    return ProductImage;
  };
  
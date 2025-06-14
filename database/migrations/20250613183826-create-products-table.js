'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      category: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      brand: {
        type: Sequelize.DataTypes.STRING,
      },
      store: {
        type: Sequelize.DataTypes.STRING,
      },
      serial_number: {
        type: Sequelize.DataTypes.STRING,
      },
      price: {
        type: Sequelize.DataTypes.DECIMAL,
      },
      purchase_date: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      warranty_months: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
      },
      description: {
        type: Sequelize.DataTypes.TEXT,
      },
      image_url: {
        type: Sequelize.DataTypes.STRING,
      },
      note_url: {
        type: Sequelize.DataTypes.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  },
};

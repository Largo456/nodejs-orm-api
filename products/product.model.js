const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        name: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: false },
        price: { type: DataTypes.FLOAT, allowNull: false },
        quantity: { type: DataTypes.INTEGER, allowNull: false },
        category: { type: DataTypes.STRING, allowNull: false }
    };

    const options = {
        defaultScope: {
            attributes: { exclude: ['passwordHash'] }
        },
        scopes: {
            withHash: { attributes: {} }
        }
    };

    return sequelize.define('Product', attributes, options);
}
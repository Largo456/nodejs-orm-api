const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};

async function getAllProducts() {
    return await db.Product.findAll();
}

async function getProductById(id) {
    return await getProduct(id);
}

async function createProduct(params) {
    const existingProduct = await db.Product.findOne({ where: { name: params.name } });
    if (existingProduct) {
        throw 'Product with name "' + params.name + '" already exists';
    }

    const product = new db.Product(params);
    await product.save();
}

async function updateProduct(id, params) {
    const product = await getProduct(id);

    if (params.name && product.name !== params.name) {
        const existingProduct = await db.Product.findOne({ where: { name: params.name } });
        if (existingProduct) {
            throw 'Product with name "' + params.name + '" already exists';
        }
    }

    await product.update(params);
}

async function deleteProduct(id) {
    const product = await getProduct(id);
    await product.destroy();
}

async function getProduct(id) {
    const product = await db.Product.findByPk(id);
    if (!product) throw 'Product not found';
    return product;
}
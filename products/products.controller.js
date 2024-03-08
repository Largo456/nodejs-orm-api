const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const productService = require('./product.service');


router.get('/', getAll);


router.get('/:id', getById);


router.post('/', createSchema, create);

// Update an existing product
router.put('/:id', updateSchema, update);

// Delete a product
router.delete('/:id', _delete);

module.exports = router;

// Function to get all products
function getAll(req, res, next) {
    productService.getAllProducts()
        .then(products => res.json(products))
        .catch(next);
}

// Function to get product by ID
function getById(req, res, next) {
    productService.getProductById(req.params.id)
        .then(product => res.json(product))
        .catch(next);
}

// Function to create a new product
function create(req, res, next) {
    productService.createProduct(req.body)
        .then(() => res.status(201).json({ message: 'Product created successfully' }))
        .catch(next);
}

// Function to update an existing product
function update(req, res, next) {
    productService.updateProduct(req.params.id, req.body)
        .then(() => res.json({ message: 'Product updated successfully' }))
        .catch(next);
}

// Function to delete a product
function _delete(req, res, next) {
    productService.deleteProduct(req.params.id)
        .then(() => res.json({ message: 'Product deleted successfully' }))
        .catch(next);
}

// Joi schema for validating request body when creating a product
function createSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required(),
        quantity: Joi.number().required(),
        category: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

// Joi schema for validating request body when updating a product
function updateSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().empty(''),
        description: Joi.string().empty(''),
        price: Joi.number().empty(''),
        quantity: Joi.number().empty(''),
        category: Joi.string().empty('')
    });
    validateRequest(req, next, schema);
}
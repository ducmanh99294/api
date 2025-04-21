const express = require('express');
const { createProductController, getALlProducts, getProductById, deleteProduct, updateProduct } = require('../controllers/productController');
const router = express.Router();

router.post('/create-product', createProductController)
router.get('/all-products', getALlProducts)
router.get('/getProduct/:id', getProductById)
router.delete('/product/:id', deleteProduct)
router.put('/product/:id', updateProduct)


module.exports = router;
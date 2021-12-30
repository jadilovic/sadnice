const express = require('express');
const router = express.Router();

const {
	getAllProducts,
	getProduct,
	// deleteProduct,
	// updateProduct,
	createProduct,
	deleteCloudinaryImage,
} = require('../controllers/products');

router.route('/').post(createProduct).get(getAllProducts);
router.route('/:id').get(getProduct); //.patch(updateUser).delete(deleteTask);
router.route('/images/:id').delete(deleteCloudinaryImage);

module.exports = router;

const express = require('express');
const router = express.Router();

const {
	getAllOrders,
	getOrder,
	// deleteProduct,
	// updateProduct,
	createOrder,
} = require('../controllers/orders');

router.route('/').post(createOrder).get(getAllOrders);
router.route('/:id').get(getOrder); //.patch(updateOrder).delete(deleteOrder);

module.exports = router;

const express = require('express');
const router = express.Router();

const {
	getAllUsers,
	getUser,
	deleteUser,
	updateUser,
	createRoles,
	getAllRoles,
} = require('../controllers/users');

router.route('/roles').post(createRoles).get(getAllRoles);
router.route('/').get(getAllUsers);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;

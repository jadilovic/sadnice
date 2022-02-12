const express = require('express');
const router = express.Router();

const {
	getAllUsers,
	getUser,
	deleteUser,
	// createTask,
	updateUser,
	createRoles,
	getAllRoles,
	// filterTasksByAvatarIconAndColor,
} = require('../controllers/users');

router.route('/roles').post(createRoles).get(getAllRoles);
router.route('/').get(getAllUsers);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);
// router.route('/filters').post(filterTasksByAvatarIconAndColor);

module.exports = router;

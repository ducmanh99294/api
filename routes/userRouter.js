const express = require('express');
const { updateUser, registerController, loginController, getAllUsers, getUserById, deleteUser } = require('../controllers/useController');
const router = express.Router();

router.post('/register', registerController)
router.post('/login', loginController)
router.get('/users', getAllUsers)
router.get('/users/:id', getUserById)
router.delete('/delete/users/:id', deleteUser);
router.put('/update-user', updateUser);

module.exports = router
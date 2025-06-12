const express = require('express');
const { getAllUsers, getUserById, createUser, updateUser, deleteUser, getUserByEmail } = require('../controllers/userController');
const { loginUser, signUpUser } = require('../controllers/login');
const { authenticate, authorize } = require('../middlewares/auth');

const router = express.Router();

router.post('/signup', signUpUser);
router.post('/login', loginUser);

router.get('/', getAllUsers);
router.get('/:id', authenticate, authorize(['admin', 'user', 'owner']), getUserById);
router.post('/email', authenticate, authorize(['admin', 'user']), getUserByEmail);
router.post('/',authenticate,authorize(["admin","user"]), createUser);   
router.put('/:id', authenticate, authorize(['admin', 'user']), updateUser);
router.delete('/:id', authenticate, authorize(['admin']), deleteUser);

module.exports = router;

const bcrypt = require('bcryptjs');
const db = require('../config/db');
const User = db.User;

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser: _deleteUser
};

async function createUser(newUser) {
    if (await User.findOne({ username: newUser.username })) {
        throw `Username "${newUser.username}" is already taken.`;
    }

    const user = new User(newUser);

    if (newUser.password) {
        newUser.hash = bcrypt.hashSync(newUser.password, 10);
    }

    await newUser.save();
}

async function getAllUsers() {
    return await User.find().select('-hash');
}

async function getUserById(id) {
    return await User.findById(id).select('-hash');
}

async function updateUser(id, editUser) {
    const user = await User.findById(id);

    if (!user) throw 'User Not Found.';

    if (
        user.username !== editUser.username &&
        (await User.findOne({ username: editUser.username }))
    ) {
        throw `Username "${newUser.username}" is already taken.`;
    }

    if (editUser.password) {
        editUser.hash = bcrypt.hashSync(editUser.password, 10);
    }

    Object.assign(user, editUser);

    await user.save();
}

async function _deleteUser(id) {
    await user.findByIdAndRemove(id);
}

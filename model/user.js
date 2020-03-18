const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    createdDate: { type: Date, default: Date.now }
});

userSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', userSchema);

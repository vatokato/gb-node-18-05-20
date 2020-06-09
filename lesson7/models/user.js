const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const Schema = mongoose.Schema;

const saltRounds = 12;

const userSchema = new Schema({
    username: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    password: { type: String },
});

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        const salt = bcryptjs.genSaltSync(saltRounds);
        this.password = bcryptjs.hashSync(this.password, salt);
    }

    next();
});
userSchema.methods.comparePassword = function(candidate) {
    return bcryptjs.compareSync(candidate, this.password);
}
module.exports = mongoose.model('User', userSchema, 'tasks_users');

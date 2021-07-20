const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// Student Schema
const studentSchmea = new Schema(
    {
        studentId: {
            type: String,
            required: [true, 'Student ID is required'],
            unique: true,
            trim: true
        },
        name: {
            type: String,
            required: [true, 'username is required'],
            trim: true
        },
        email: {
            type: String,
            unique: [true, 'email is not unique'],
            required: [true, 'email is required'],
            match: [/.+@.+\..+/, 'Must match an email address!']
        },
        password: {
            type: String,
            required: true,
            minlength: [6, "Password must atleast be 6 characters long"],
        },
    },
    {
        toJSON: {
            getters: true
        }
    }
);

// set up pre-save middleware to create password
studentSchmea.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

// compare the incoming password with the hashed password
studentSchmea.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const Student = model('Student', studentSchmea);

module.exports = Student;
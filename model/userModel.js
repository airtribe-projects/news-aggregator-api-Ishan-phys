const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          // Basic email regex
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: props => `${props.value} is not a valid email!`
      }
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters long']
    },
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    preferences: {
      type: [String],
      default: []
    }
  }
);

// Pre-save hook to hash password
userSchema.pre('save', async function (next) {
  // Only hash the password if it's new or modified
  if (!this.isModified('password')) return next();

  try {
    const saltRounds = 10;
    const hash = await bcrypt.hash(this.password, saltRounds);
    this.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  role: {
    type: String,
    enum: ['CLIENT', 'ADMIN'],
    default: 'CLIENT',
  },
  phone: {
    type: String,
    required: true,
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
}, { timestamps: true });

UserSchema.virtual('profile').get(function () {
  const {
    name, email, role, phone
  } = this;

  return {
    name,
    email,
    role,
    phone,
  };
});

UserSchema.pre('save', async function save(next) {
  const user = this;

  try {
    if (!user.isModified('password')) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.comparePassword = async function comparePassword(password, next) {
  const user = this;

  try {
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch;
  } catch (error) {
    next(error);
    return false;
  }
};

const User = mongoose.model('user', UserSchema);

module.exports = User;

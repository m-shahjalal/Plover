const { Schema, module } = require('mongoose');

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      min: 3,
      max: 30,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile: {
      type: Schema.Types.ObjectId,
      ref: 'Profile',
    },
  },
  { timestamps: true }
);

const User = model('User', userSchema);

// export model
module.exports = User;

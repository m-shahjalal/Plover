const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      validate: (email) => {
        var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return re.test(email);
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
  },
  { timestamps: true }
);

const User = model('User', userSchema);

// export model
module.exports = User;

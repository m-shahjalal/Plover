const { Schema, model } = require('mongoose');

//user, title, bio, profilePic, links,  posts, bookmarks
const ProfileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    userName: {
      type: String,
      required: true,
      maxlength: 15,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    bio: {
      type: String,
      trim: true,
      maxlength: 400,
    },
    profilePic: String,
    links: {
      website: String,
      facebook: String,
      twitter: String,
      github: String,
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
  },
  { timestamps: true }
);

const Profile = model('Profile', ProfileSchema);
module.exports = Profile;

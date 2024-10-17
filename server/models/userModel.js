const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "firstname is required!"],
      trim: true
    },
    lastname: {
      type: String,
      required: [true, "lastname is required!"],
      trim: true
    },
    email: {
      type: String,
      required: [true, "email is required!"],
      unique: [true, "email already exists!"],
      validate: {
        validator: function(el) {
          if (
            !(
              el.split("@")[0] &&
              el.split("@")[1] &&
              el.split("@")[1].split(".")[0] &&
              el.split("@")[1].split(".")[1]
            )
          ) {
            return false;
          }
          return true;
        },
        message: "email invalid!"
      },
      trim: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    password: {
      type: String,
      required: [true, "password is required!"],
      minlength: [8, "password cannot be less than 8 characters!"],
      select: false
    },
    isActive: {
      type: Boolean,
      default: true,
      select: false
    }
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// filter active account before every query
userSchema.pre("find", function(next) {
  this.find({ isActive: { $ne: false } });
  next();
});
userSchema.pre("findOne", function(next) {
  this.find({ isActive: { $ne: false } });
  next();
});
userSchema.pre("findOneAndUpdate", function(next) {
  this.find({ isActive: { $ne: false } });
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;

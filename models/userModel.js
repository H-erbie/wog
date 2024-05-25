import bcrypt from "bcrypt";
import { Model, models, model, Document, Schema } from "mongoose";

const userSchema = new Schema(
  {
    fname: {
      type: String,
      required: [true, "please provide first name"],
      trim: true,
    },
    lname: {
      type: String,
      required: [true, "please provide last name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "please provide email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g,
      ],
      unique: true,
    },
    phone:{
      type: String,
      required: [true, "please provide mobile contact details"],
    },
    password: {
      type: String,
      required: [true, "please provide password"],
    },
    emailCode: {
      type: String,
      // required: [true, "please provide email verification code"],
    },
    role: {
      type: String,
      enum: ["unverified_user", "verified_user", "admin"],
      default: "unverified_user",
    },
  },
  { timestamps: true }
);

//hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    throw error;
  }
});

//compare password
 userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

const UserModel = models.User || model('User', userSchema)
export default UserModel
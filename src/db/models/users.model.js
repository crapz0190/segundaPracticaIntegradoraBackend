import { Schema, model } from "mongoose";

const userCollection = "Users";

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // age: {
  //   type: Number,
  //   required: true,
  // },
  password: {
    type: String,
  },
  isGithub: {
    type: Boolean,
    default: false,
  },
  cart: {
    type: Schema.Types.ObjectId,
    ref: "Products",
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

export const usersModel = model(userCollection, userSchema);

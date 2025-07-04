
// import mongoose from "mongoose"

// const UserModel = new mongoose.Schema({
//     name: String,
//     password: String,
//     email: String,
// })

// export const UserSchema = mongoose.models?.restaurants || mongoose.model("restaurants", UserModel)

import mongoose from "mongoose";

const UserModel = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

export const User = mongoose.models?.User || mongoose.model("User", UserModel);

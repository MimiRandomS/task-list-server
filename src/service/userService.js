// UserService.js
const bcrypt = require("bcrypt");
const User = require("../Schema/userSchema");

async function createUser(email, password, role = "user") {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already in use");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    email,
    password: hashedPassword,
    role,
  });
  await newUser.save();
  return newUser;
}

module.exports = {
  createUser,
};

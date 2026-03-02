// authService.js
const bcrypt = require("bcrypt");
const User = require("../Schema/userSchema");

async function findUserByEmail(email) {
  return await User.findOne({ email });
}

async function authenticate(email, password) {
  const user = await findUserByEmail(email);
  if (!user) return null;
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;
  return user;
}

module.exports = {
  findUserByEmail,
  authenticate
};

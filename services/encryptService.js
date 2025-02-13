const bcrypt = require("bcryptjs");

class EncryptService {
  static encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10); // Generate salt with 10 rounds
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  };
  static comparePassword = async (enteredPassword, storedHashedPassword) => {
    return await bcrypt.compare(enteredPassword, storedHashedPassword);
  };
}

module.exports = EncryptService;
// const hashedPassword = await encryptPassword("mypassword");
// const isMatch = await comparePassword("mypassword", hashedPassword);
// console.log(isMatch); // true

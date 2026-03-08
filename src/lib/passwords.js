const crypto = require("crypto");

/**
 *
 * @param {string} password -
 * @returns {string} -
 */
const hashPassword = (password) => {
  return crypto.createHash("sha256").update(password).digest("hex");
};

/**
 *
 * @param {string} plainPassword -
 * @param {string} hashedPassword -
 * @returns {boolean} -
 */
const comparePassword = (plainPassword, hashedPassword) => {
  return hashPassword(plainPassword) === hashedPassword;
};

module.exports = { hashPassword, comparePassword };

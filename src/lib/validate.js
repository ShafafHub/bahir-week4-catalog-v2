const validateProduct = (product) => {
  const { name, price, categoryId } = product;
  if (!name || !price || !categoryId) {
    return { valid: false, error: "تمام فیلدها الزامی هستند" };
  }
  return { valid: true };
};

module.exports = { validateProduct };

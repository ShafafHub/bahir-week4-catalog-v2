const db = require("./db");

// get
const getProducts = (callback) => {
  db.all("SELECT * FROM products", [], callback);
};

// Post
const addProduct = (product, callback) => {
  const { name, price, categoryId } = product;
  const sql = `INSERT INTO products (name, price, categoryId) VALUES (?, ?, ?)`;
  db.run(sql, [name, price, categoryId], function (err) {
    callback(err, this ? this.lastID : null);
  });
};

// Put method
const updateProduct = (id, product, callback) => {
  const { name, price, categoryId } = product;
  const sql = `UPDATE products SET name = ?, price = ?, categoryId = ? WHERE id = ?`;
  db.run(sql, [name, price, categoryId, id], function (err) {
    callback(err, this ? this.changes : 0);
  });
};

// delete
const deleteProduct = (id, callback) => {
  const sql = `DELETE FROM products WHERE id = ?`;
  db.run(sql, [id], function (err) {
    callback(err, this ? this.changes : 0);
  });
};

module.exports = {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};

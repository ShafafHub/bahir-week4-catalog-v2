const express = require("express");
const store = require("./src/lib/store");
const { authenticate, generateToken } = require("./src/lib/auth");
const { validateProduct } = require("./src/lib/validate");

const app = express();
app.use(express.json());

const PORT = 3000;

// 1. Health Check
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Server is On" });
});

// 2. Auth - Login
app.post("/auth/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "1234") {
    const token = generateToken({ username, role: "admin" });
    return res.json({ token });
  }
  res.status(401).json({ error: "Invalid credentials" });
});

// 3. Profile (Protected)
app.get("/auth/me", authenticate, (req, res) => {
  res.json({ user: req.user });
});

//

// GET: All products
app.get("/products", (req, res) => {
  store.getProducts((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST: Add new product
app.post("/products", authenticate, (req, res) => {
  const validation = validateProduct(req.body);
  if (!validation.valid)
    return res.status(400).json({ error: validation.error });

  store.addProduct(req.body, (err, lastID) => {
    if (err) return res.status(400).json({ error: err.message });
    res.status(201).json({ message: "Product added successfully", id: lastID });
  });
});

// PUT: Update product
app.put("/products/:id", authenticate, (req, res) => {
  store.updateProduct(req.params.id, req.body, (err, changes) => {
    if (err) return res.status(400).json({ error: err.message });
    if (changes === 0)
      return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product updated successfully" });
  });
});

// DELETE: Remove product
app.delete("/products/:id", authenticate, (req, res) => {
  store.deleteProduct(req.params.id, (err, changes) => {
    if (err) return res.status(500).json({ error: err.message });
    if (changes === 0)
      return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Professional Server running on http://localhost:${PORT}`);
});

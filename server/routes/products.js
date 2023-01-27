const express = require('express');
const path = require('path');
const fs = require('fs').promises;

const db = require('../db');

const router = express.Router();


// Get all Products
router.get('/', async (req, res) => {
  try {
    const results = await db.query(
      "SELECT * FROM products"
    );

    res.status(200).json({
      status: "success",
      data: {
        products: results.rows,
      }
    });
  } catch (err) {
    console.log(err);
  }
});

// Get a Product
router.get('/:id', async (req, res) => {
  try {
    const results = await db.query(
      "SELECT * FROM products WHERE id = $1", [req.params.id]
    );

    res.status(200).json({
      status: "success",
      data: {
        product: results.rows[0],
      }
    });
  } catch (err) {
    console.log(err);
  }
});

// Create a Product
router.post('/', async (req, res) => {
  const obj = JSON.parse(req.files.body.data);

  if (req.files.file !== undefined) {
    const filename = Date.now() + path.extname(req.files.file.name);
    const file = req.files.file;

    let uploadPath = __dirname + '/../uploads/' + filename;

    file.mv(uploadPath, (err) => {
      if (err) console.log(err);
      console.log("Image uploaded");
    });

    try {
      const results = await db.query(
        "INSERT INTO products (title, description, price, picture) VALUES ($1, $2, $3, $4) RETURNING *",
        [obj.title, obj.description, obj.price, filename]
      );

      res.status(201).json({
        status: "success",
        data: {
          product: results.rows[0]
        }
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    try {
      const results = await db.query(
        "INSERT INTO products (title, description, price) VALUES ($1, $2, $3) RETURNING *",
        [obj.title, obj.description, obj.price]
      );

      res.status(201).json({
        status: "success",
        data: {
          product: results.rows[0]
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
});

// Update a Product
router.put('/:id', async (req, res) => {
  const obj = JSON.parse(req.files.body.data);

  if (req.files.file !== undefined) {
    const filename = Date.now() + path.extname(req.files.file.name);
    const file = req.files.file;

    let uploadPath = __dirname + '/../uploads/' + filename;

    file.mv(uploadPath, (err) => {
      if (err) console.log(err);
      console.log("Image uploaded");
    });

    try {
      const [product, results] = await Promise.all([
        db.query("SELECT * FROM products WHERE id = $1", [req.params.id]),
        db.query("UPDATE products SET title = $1, description = $2, price = $3, picture = $4 WHERE id = $5 RETURNING *",
          [obj.title, obj.description, obj.price, filename, req.params.id])
      ]);

      if (product.rows[0].picture !== null) {
        fs.unlink(__dirname + '/../uploads/' + product.rows[0].picture, (err) => {
          if (err) console.log(err);
          console.log('File deleted');
        });
      }

      res.status(200).json({
        status: "success",
        data: {
          product: results.rows[0]
        }
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    try {
      const results = await db.query("UPDATE products SET title = $1, description = $2, price = $3 WHERE id = $4 RETURNING *",
        [obj.title, obj.description, obj.price, req.params.id]);

      res.status(200).json({
        status: "success",
        data: {
          product: results.rows[0]
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
});

// Delete a Product
router.delete('/:id', async (req, res) => {
  try {
    const [product, results] = await Promise.all([
      db.query("SELECT * FROM products WHERE id = $1", [req.params.id]),
      db.query("DELETE FROM products WHERE id = $1", [req.params.id])
    ]);

    if (product.rows[0].picture !== null) {
      fs.unlink(__dirname + '/../uploads/' + product.rows[0].picture, (err) => {
        if (err) console.log(err);
        console.log('File deleted');
      });
    }

    res.status(204).json({
      status: "success"
    });
  } catch (err) {
    console.log(err);
  }
});


module.exports = router;
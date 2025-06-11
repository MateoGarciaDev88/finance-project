import { db } from '../database/db.js';

const getAllCategories = (req, res) => {
  try {
    db.query(`SELECT * FROM categories`,
            (err, rows) => {
              if (err) res.status(400).send(err);
              res.status(200).json(rows);
            });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).send(error.message);
  }
}

const getCategoryById = (req, res) => {
  const { id } = req.params;
  try {
    db.query(`SELECT * FROM categories WHERE id = ?`,
            [id],
            (err, rows) => {
              if (err) res.status(400).send(err);
              res.status(200).json(rows);
            });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).send(error.message);
  }
}

const createCategory = (req, res) => {
  try {
    const { user_id, name, tipe } = req.body;
    db.query(`INSERT INTO categories
              (id, user_id, name, tipe, create_date)
              VALUES(NULL, ?, ?, ?, CURRENT_TIMESTAMP);`,
            [user_id, name, tipe], (err, rows) => {
              if (err) res.status(400).send(err);
              res.status(200).json(rows);
            });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).send(error.message);
  }
}

const updateCategoryById = (req, res) => {
  const { id } = req.params;
  try {
    const { user_id, name, tipe } = req.body;
    db.query(`UPDATE categories
              SET user_id=?, name=?, tipe=?, create_date=CURRENT_TIMESTAMP
              WHERE id=?;`,
            [user_id, name, tipe, id], (err, rows) => {
              if (err) res.status(400).send(err);
              res.status(200).json(rows);
            });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).send(error.message);
  }
}

const deleteCategoryById = (req, res) => {
  const { id } = req.params;
  try {
    db.query(`DELETE FROM categories WHERE id = ?`,
            [id],
            (err, rows) => {
              if (err) res.status(400).send(err);
              res.status(200).json(rows);
            });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).send(error.message);
  }
}

export {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategoryById,
  deleteCategoryById,
}

// Agregar consulta por filtro 

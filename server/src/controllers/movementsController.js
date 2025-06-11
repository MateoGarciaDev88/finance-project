import { db } from '../database/db.js';

const getAllMovements = (req, res) => {
  try {
    db.query(`SELECT * FROM movements`,
            (err, rows) => {
              if (err) res.status(400).send(err);
              res.status(200).json(rows);
            });
  } catch (error) {
    console.error('Error creating movement:', error);
    res.status(500).send(error.message);
  }
}

const getMovementById = (req, res) => {
  const { id } = req.params;
  try {
    db.query(`SELECT * FROM movements WHERE id = ?`,
            [id],
            (err, rows) => {
              if (err) res.status(400).send(err);
              res.status(200).json(rows);
            });
  } catch (error) {
    console.error('Error creating movement:', error);
    res.status(500).send(error.message);
  }
}

const createMovement = (req, res) => {
  try {
    const { user_id, category_id, tipe, amount, description, date } = req.body;
    db.query(`INSERT INTO movements
              (id, user_id, category_id, tipe, amount, description, date, register_date)
              VALUES(NULL, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP);`,
            [user_id, category_id, tipe, amount, description, date], (err, rows) => {
              if (err) res.status(400).send(err);
              res.status(200).json(rows);
            });
  } catch (error) {
    console.error('Error creating movement:', error);
    res.status(500).send(error.message);
  }
}

const updateMovementById = (req, res) => {
  const { id } = req.params;
  try {
    const { user_id, category_id, tipe, amount, description, date } = req.body;
    db.query(`UPDATE financeproject.movements
              SET user_id=?, category_id=?, tipe=?, amount=?, description=?, date=?, register_date=CURRENT_TIMESTAMP
              WHERE id=?;`,
            [user_id, category_id, tipe, amount, description, date, id], (err, rows) => {
              if (err) res.status(400).send(err);
              res.status(200).json(rows);
            });
  } catch (error) {
    console.error('Error creating movement:', error);
    res.status(500).send(error.message);
  }
}

const deleteMovementById = (req, res) => {
  const { id } = req.params;
  try {
    db.query(`DELETE FROM movements WHERE id = ?`,
            [id],
            (err, rows) => {
              if (err) res.status(400).send(err);
              res.status(200).json(rows);
            });
  } catch (error) {
    console.error('Error creating movement:', error);
    res.status(500).send(error.message);
  }
}

export {
  getAllMovements,
  getMovementById,
  createMovement,
  updateMovementById,
  deleteMovementById,
}
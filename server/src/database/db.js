import mysql from 'mysql2';

const config = {
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'financeproject',
  port: 3306,
}

const db = mysql.createConnection(config);

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('DB connected');
});

export {
  db
};
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import {
  categoriesRouter,
  movementsRouter,
  singUpRouter,
  loginRouter,
} from '../src/routes/index.js'

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();
app.use(cors());
app.use(express.json());

app.use("/api/movements", movementsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/singup", singUpRouter);
app.use("/api/login", loginRouter); // Assuming you have a login route


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./config/db.js";
import borrowerRoutes from "./routes/borrower.routes.js";
import loanRoutes from "./routes/loan.routes.js";
import userRoutes from "./routes/user.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import { errorHandler, pageNotFound } from "./middlewares/error.middlewares.js";
import helmet from "helmet";

dotenv.config();

const app = express();
const baseURL = "/api/v1";

db();
app.use(cors());
app.use(express.json());
app.use(helmet());

app.use(`${baseURL}/users`, userRoutes);
app.use(`${baseURL}/borrowers`, borrowerRoutes);
app.use(`${baseURL}/loans`, loanRoutes);
app.use(`${baseURL}/payments`, paymentRoutes);
app.use(pageNotFound);
app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`Server is listening on port ${process.env.PORT}`)
);

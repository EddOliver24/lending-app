import { Router } from "express";
import {
  addPayment,
  getAllPayments,
  getPaymentById,
  softDeletePaymentById,
  editPaymentById
} from "../controllers/payment.controllers.js";

const paymentRouter = Router();

paymentRouter.post("/pay", addPayment);
paymentRouter.get("/", getAllPayments);
paymentRouter.get("/:paymentId", getPaymentById);
paymentRouter.delete("/:paymentId", softDeletePaymentById);
paymentRouter.patch("/:paymentId", editPaymentById);

export default paymentRouter;

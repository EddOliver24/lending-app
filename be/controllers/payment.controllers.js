import Payment from "../models/payment.models.js";
import Borrower from "../models/borrower.models.js";
import { asyncHandler } from "../middlewares/error.middlewares.js";

const addPayment = asyncHandler(async (req, res) => {
  const { borrowerId, amountReceived, dateReceived } = req.body;

  const isBorrowerExist = await Borrower.findOne({ _id: borrowerId });

  if (!isBorrowerExist) {
    res.status(404);
    throw new Error("Borrower not found.");
  } else {
    const newPayment = new Payment({
      borrowerId,
      amountReceived,
      dateReceived
    });
    await newPayment.save();

    res.status(201).send({
      message: "Payment has been added.",
      data: newPayment
    });
  }
});

const getAllPayments = asyncHandler(async (req, res) => {
  const payments = await Payment.find()
    .select(["_id", "amountReceived", "dateReceived"])
    .sort({ createdAt: -1 })
    .populate({ path: "borrowerId", select: ["firstName", "lastName"] });

  res.status(200).send({ message: "List of Payments", data: payments });
});

const getPaymentById = asyncHandler(async (req, res) => {
  const { paymentId } = req.params;

  const paymentById = await Payment.findOne({ _id: paymentId })
    .select("-updatedAt")
    .populate({ path: "borrowerId", select: ["firstName", "lastName"] });

  if (!paymentById) {
    res.status(404);
    throw new Error("Payment application not found.");
  } else {
    res
      .status(200)
      .send({ message: `Payment ID ${paymentId}`, data: paymentById });
  }
});

const softDeletePaymentById = asyncHandler(async (req, res) => {
  const { paymentId } = req.params;
  const softDeletePaymentById = await Payment.findByIdAndDelete(paymentId);
  if (!softDeletePaymentById) {
    res.status(500);
    throw new Error("Something went wrong while deleting the payment.");
  } else {
    res.status(204).send();
  }
});

const editPaymentById = asyncHandler(async (req, res) => {
  const { paymentId } = req.params;

  const paymentById = await Payment.findOne({ _id: paymentId });

  if (!paymentById) {
    res.status(404);
    throw new Error("Payment not found.");
  } else {
    for (let key in req.body) {
      paymentById[key] = req.body[key];
    }
    const { matchedCount } = await Payment.updateOne(
      { _id: paymentId },
      { $set: paymentById }
    );
    if (!matchedCount) {
      res.status(500);
      throw new Error(
        "Something went wrong while updating the payment details."
      );
    } else {
      res.status(200).send({
        message: "Payment application details has been updated.",
        data: paymentById
      });
    }
  }
});

export {
  addPayment,
  getAllPayments,
  getPaymentById,
  softDeletePaymentById,
  editPaymentById
};

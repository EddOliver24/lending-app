import Loan from "../models/loan.models.js";
import Borrower from "../models/borrower.models.js";
import { asyncHandler } from "../middlewares/error.middlewares.js";

const addLoan = asyncHandler(async (req, res) => {
  const {
    borrowerId,
    amountLoaned,
    dateApplied,
    purpose,
    interestMonthly,
    durationMonth
  } = req.body;

  const borrower = await Borrower.findOne({ _id: borrowerId });

  if (!borrower) {
    res.status(404);
    throw new Error("Not Found.");
  } else {
    const newLoan = new Loan({
      borrowerId,
      amountLoaned,
      dateApplied,
      purpose,
      interestMonthly,
      durationMonth
    });
    await newLoan.save();

    res
      .status(201)
      .send({ message: "Loan application created.", data: newLoan });
  }
});

const softDeleteLoanById = asyncHandler(async (req, res) => {
  const { loanId } = req.params;
  const softDeleteLoanById = await Loan.findByIdAndDelete(loanId);
  if (!softDeleteLoanById) {
    res.status(500);
    throw new Error("Something went wrong while deleting the loan.");
  } else {
    res.status(204).send();
  }
});

const getAllLoans = asyncHandler(async (req, res) => {
  const loans = await Loan.find()
    .select(["_id", "amountLoaned", "dateApplied"])
    .sort({ createdAt: -1 })
    .populate({ path: "borrowerId", select: ["firstName", "lastName"] });

  res.status(200).send({ message: "List of Loan's applied", data: loans });
});

const getLoanById = asyncHandler(async (req, res) => {
  const { loanId } = req.params;

  const loanById = await Loan.findOne({ _id: loanId })
    .select("-updatedAt")
    .populate({ path: "borrowerId", select: ["firstName", "lastName"] });

  if (!loanById) {
    res.status(404);
    throw new Error("Loan application not found.");
  } else {
    res.status(200).send({ message: `Loan ID ${loanId}`, data: loanById });
  }
});

const editLoanById = asyncHandler(async (req, res) => {
  const { loanId } = req.params;

  const loanById = await Loan.findOne({ _id: loanId });

  if (!loanById) {
    res.status(404);
    throw new Error("Loan application not found.");
  } else {
    for (let key in req.body) {
      loanById[key] = req.body[key];
    }
    const { matchedCount } = await Loan.updateOne(
      { _id: loanId },
      { $set: loanById }
    );
    if (!matchedCount) {
      res.status(500);
      throw new Error(
        "Something went wrong while updating the loan application details."
      );
    } else {
      res.status(200).send({
        message: "Loan application details has been updated.",
        data: loanById
      });
    }
  }
});

export { addLoan, getAllLoans, softDeleteLoanById, getLoanById, editLoanById };

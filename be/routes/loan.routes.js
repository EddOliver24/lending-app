import { Router } from "express";
import {
  addLoan,
  softDeleteLoanById,
  getAllLoans,
  getLoanById,
  editLoanById,
} from "../controllers/loan.controllers.js";

const loanRouter = Router();

loanRouter.post("/apply", addLoan);
loanRouter.delete("/:loanId", softDeleteLoanById);
loanRouter.get("/", getAllLoans);
loanRouter.get("/:loanId", getLoanById);
loanRouter.patch("/:loanId", editLoanById);

export default loanRouter;

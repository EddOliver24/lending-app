import { Router } from "express";
import {
  addBorrower,
  getAllBorrowers,
  getBorrowerById,
  deleteBorrowerById,
  editBorrowerById
} from "../controllers/borrower.controllers.js";
import multer from "multer";
import { storage } from "../config/storage.js";
import { verifyAccessToken } from "../middlewares/auth.middlewares.js";

const borrowerRouter = Router();
const borrowerImage = multer({ storage });

borrowerRouter.post(
  "/register",
  borrowerImage.single("borrower-image"),
  verifyAccessToken,
  addBorrower
);
borrowerRouter.get("/", getAllBorrowers);
borrowerRouter.get("/:borrowerId", getBorrowerById);
borrowerRouter.delete("/:borrowerId/:imageFilename", deleteBorrowerById);
borrowerRouter.put(
  "/:borrowerId",
  borrowerImage.single("borrower-image"),
  editBorrowerById
);

export default borrowerRouter;

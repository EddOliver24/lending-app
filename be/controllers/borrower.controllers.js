import Borrower from "../models/borrower.models.js";
import Loan from "../models/loan.models.js";
import Payment from "../models/payment.models.js";
import { cloudinary } from "../config/storage.js";
import { asyncHandler } from "../middlewares/error.middlewares.js";

const addBorrower = asyncHandler(async (req, res) => {
  const {
    userId,
    firstName,
    middleName,
    lastName,
    birthdate,
    homeAddress,
    contactNumber,
    email
  } = req.body;

  const { path, filename } = req.file;

  const isBorrowerExist = await Borrower.findOne({
    email,
    deleted: { $ne: true }
  });

  if (isBorrowerExist) {
    res.status(400);
    throw new Error("Email already exists.");
  } else {
    const newBorrower = new Borrower({
      userId,
      firstName,
      middleName,
      lastName,
      birthdate,
      homeAddress,
      contactNumber,
      photoId: { path, filename },
      email
    });
    await newBorrower.save();

    res.status(201).send({
      message: "Borrower has been added.",
      data: newBorrower
    });
  }
});

const getAllBorrowers = asyncHandler(async (req, res) => {
  const borrowers = await Borrower.find()
    .select(["_id", "firstName", "lastName", "photoId", "createdAt"])
    .sort({ createdAt: 1 })
    .populate({ path: "userId", select: "username" });

  res.status(200).send({ message: "List of borrowers", data: borrowers });
});

const getBorrowerById = asyncHandler(async (req, res) => {
  const { borrowerId } = req.params;

  const borrowerById = await Borrower.findOne({ _id: borrowerId })
    .select("-updatedAt")
    .populate({
      path: "userId",
      select: "username"
    });

  if (!borrowerById) {
    res.status(404);
    throw new Error("Borrower not found.");
  } else {
    const loans = await Loan.find({ borrowerId }).select([
      "amountLoaned",
      "dateApplied",
      "purpose"
    ]);

    const payments = await Payment.find({ borrowerId }).select([
      "amountReceived",
      "dateReceived"
    ]);

    res.status(200).send({
      message: `Borrower with ID ${borrowerId}`,
      data: { borrower: borrowerById, loans, payments }
    });
  }
});

const editBorrowerById = asyncHandler(async (req, res) => {
  const { borrowerId } = req.params;
  const {
    firstName,
    middleName,
    lastName,
    birthdate,
    homeAddress,
    contactNumber,
    email
  } = req.body;
  const { path, filename } = req.file;

  const borrowerById = await Borrower.findOne({ _id: borrowerId });

  if (!borrowerById) {
    res.status(404);
    throw new Error("Borrower not found.");
  } else {
    if (firstName) borrowerById.firstName = firstName;
    if (middleName) borrowerById.middleName = middleName;
    if (lastName) borrowerById.lastName = lastName;
    if (homeAddress) borrowerById.homeAddress = homeAddress;
    if (birthdate) borrowerById.birthdate = birthdate;
    if (contactNumber) borrowerById.contactNumber = contactNumber;
    if (email) borrowerById.email = email;
    if (path && filename) {
      if (borrowerById.photoId.path && borrowerById.photoId.filename) {
        const { result } = await cloudinary.uploader.destroy(
          `${borrowerById.photoId.filename}`
        );
        if (!result) {
          res.status(500).send({
            message: "Something went wrong while deleting the photo ID."
          });
        }
      }
      borrowerById.photoId.path = path;
      borrowerById.photoId.filename = filename;
    }

    const { matchedCount } = await Borrower.updateOne(
      { _id: borrowerId },
      { $set: borrowerById }
    );
    if (!matchedCount) {
      res.status(500);
      throw new Error(
        "Something went wrong while updating the borrower details."
      );
    } else {
      res.status(200).send({
        message: "Borrower details has been updated.",
        data: borrowerById
      });
    }
  }
});

const deleteBorrowerById = asyncHandler(async (req, res) => {
  const { borrowerId, imageFilename } = req.params;

  const softDeleteBorrowerById = await Borrower.findByIdAndDelete(borrowerId);

  if (!softDeleteBorrowerById) {
    res
      .status(500)
      .send({ message: "Something went wrong while deleting the borrower." });
  } else {
    const { result } = await cloudinary.uploader.destroy(
      `lending_app/${imageFilename}`
    );
    if (!result) {
      res.status(500).send({
        message: "Something went wrong while deleting the photo ID."
      });
    } else {
      const { acknowledged } = await Loan.updateMany(
        { borrowerId },
        { $set: { deleted: true, deletedAt: new Date() } }
      );
      if (!acknowledged) {
        res.status(500).send({
          message:
            "Something went wrong while deleting the borrower's loan record."
        });
      } else {
        const { acknowledged } = await Payment.updateMany(
          { borrowerId },
          { $set: { deleted: true, deletedAt: new Date() } }
        );
        if (!acknowledged) {
          res.status(500).send({
            message:
              "Something went wrong while deleting the the borrower's payment record."
          });
        } else {
          res.status(204).send();
        }
      }
    }
  }
});

export {
  addBorrower,
  getAllBorrowers,
  getBorrowerById,
  deleteBorrowerById,
  editBorrowerById
};

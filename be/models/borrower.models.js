import { Schema, model } from "mongoose";
import softDelete from "mongoosejs-soft-delete";

const borrowerSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required."],
    },
    firstName: {
      type: String,
      required: [true, "First name field is required."],
    },
    middleName: {
      type: String,
      required: [true, "Middle name field is required."],
    },
    lastName: {
      type: String,
      required: [true, "Last name field is required."],
    },
    birthdate: {
      type: Date,
      required: [true, "Birthdate field is required."],
    },
    homeAddress: {
      type: String,
      required: [true, "Home address field is required."],
    },
    contactNumber: {
      type: String,
      required: [true, "Contact number field is required"],
    },
    photoId: {
      path: {
        type: String,
        required: [true, "Photo ID path is required"],
      },
      filename: {
        type: String,
        required: [true, "Photo filename is required."],
      },
    },
    email: {
      type: String,
      required: [true, "Email field is required."],
      unique: true,
    },
  },
  { timestamps: true }
);

borrowerSchema.plugin(softDelete);

const Borrower = model("Borrower", borrowerSchema);
export default Borrower;

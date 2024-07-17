import { Schema, model } from "mongoose";
import softDelete from "mongoosejs-soft-delete";

const loanSchema = new Schema(
  {
    borrowerId: {
      type: Schema.Types.ObjectId,
      ref: "Borrower",
      required: [true, "Borrower ID field is required."]
    },
    amountLoaned: {
      type: Number,
      required: [true, "Amount of loan field is required."]
    },
    durationMonth: {
      type: Number,
      required: [true, "Amount of loan field is required."]
    },
    interestMonthly: {
      type: Number,
      required: [true, "Amount of loan field is required."]
    },
    dateApplied: {
      type: Date,
      required: [true, "Date of application field is required."]
    },
    purpose: {
      type: String,
      required: [true, "Purpose field is required."]
    }
  },
  { timestamps: true }
);

loanSchema.plugin(softDelete);

const Loan = model("Loan", loanSchema);
export default Loan;

import { Schema, model } from "mongoose";
import softDelete from "mongoosejs-soft-delete";

const paymentSchema = new Schema(
  {
    borrowerId: {
      type: Schema.Types.ObjectId,
      ref: "Borrower",
      required: [true, "User ID is required."]
    },
    amountReceived: {
      type: Number,
      required: [true, "Amount received field is required."]
    },
    dateReceived: {
      type: Date,
      required: [true, "Date recieved field is required."]
    }
  },
  {
    timestamps: true
  }
);

paymentSchema.plugin(softDelete);

const Payment = model("Payment", paymentSchema);
export default Payment;

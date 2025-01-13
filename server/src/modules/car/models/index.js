import mongoose, { Schema } from "mongoose";

const dataSchema = new Schema({
  car: {
    type: String,
    required: true,
  },
  rent: {
    type: String,
    required: true,
  },
  addedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isRequested: {
    type: Boolean,
    default: false,
  },
  reqUsername: {
    type: String,
    required: true,
    default: "NA",
  },
  reqEmail: {
    type: String,
    required: true,
    default: "NA",
  },
  isApproved: {
    type: Boolean,
    default: false,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Model = mongoose.model("Cars", dataSchema);

export default Model;

const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
  {
    vendorName: String,
    vendorCode: String,
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vendor", vendorSchema);

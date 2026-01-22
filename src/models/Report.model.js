const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    reportDate: Date,
    department: String,
    quantity: Number,
    defectType: String,
    priority: String,
    description: String,
    vendorName: String,
    vendorCode: String,
    itemCode: String,
    reportImages: [String],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);

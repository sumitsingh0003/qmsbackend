const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true, sparse: true },
    mobile: { type: String, unique: true, sparse: true },
    password: String,
    role: {
      type: String,
      enum: ["SUPER_ADMIN", "ADMIN", "VENDOR", "USER"],
      default: "USER"
    },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    // 🔐 For logout & token control
    refreshToken: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

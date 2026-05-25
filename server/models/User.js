import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    displayName: {
      type: String,
      trim: true,
      maxlength: 80,
      required: true
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      maxlength: 140,
      required: true
    },
    passwordHash: {
      type: String,
      required: true,
      select: false
    },
    role: {
      type: String,
      enum: ["admin", "partner"],
      default: "partner"
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ role: 1, isActive: 1 });

export default mongoose.model("User", UserSchema);

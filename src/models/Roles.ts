import mongoose, { Schema } from "mongoose";
import { Roles } from "types/RolesTypes";

const RolesSchema: Schema = new Schema<Roles>(
  {
    name: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const RoleModel = mongoose.model<Roles>("Roles", RolesSchema);

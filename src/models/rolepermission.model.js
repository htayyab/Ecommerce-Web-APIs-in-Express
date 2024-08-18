import mongoose from "mongoose";
import Role from "./role.model.js";
import Permission from "./permission.model.js";

const rolePermissionSchema = new mongoose.Schema(
  {
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
    permissionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Permission",
      required: true,
    },
  },
  { timestamps: true }
);

const RolePermission = mongoose.model("RolePermission", rolePermissionSchema);

export default RolePermission;

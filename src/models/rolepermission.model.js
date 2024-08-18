import mongoose from 'mongoose';
import Role from './role.model.js';
import Permission from './permission.model.js';


//this shows many to many relation in role and permission 
const rolePermissionSchema = new mongoose.Schema({
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
    permission: { type: mongoose.Schema.Types.ObjectId, ref: 'Permission', required: true }
  });

  const Role = mongoose.model('RolePermission', rolePermissionSchema);

  export default RolePermission;
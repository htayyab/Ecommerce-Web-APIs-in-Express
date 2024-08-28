import mongoose from 'mongoose';
import Role from '../models/role.model.js';
import Permission from '../models/permission.model.js';
import RolePermission from '../models/rolePermission.model.js';
import dotenv from 'dotenv';

dotenv.config();

const seedRolePermission = async () => {
    try {

        await mongoose.connect(process.env.DB_URI);

        const [permissions, adminRole, userRole] = await Promise.all([
            Permission.find({}).exec(),
            Role.findOne({ name: 'admin' }).exec(),
            Role.findOne({ name: 'user' }).exec()
        ]);

        if (!adminRole || !userRole) {
            console.error('Roles not found');
            return;
        }

        const rolePermissions = permissions.map(permission => ({
            roleId: adminRole._id,
            permissionId: permission._id
        }));

        await RolePermission.insertMany(rolePermissions);

        console.log('Role-Permission associations created successfully');
    } catch (error) {
        console.error('Error seeding role permissions:', error.message);
    } finally {

        await mongoose.connection.close();
    }
}

export default seedRolePermission;
import mongoose from 'mongoose';
import Permission from '../models/permission.model.js';
import dotenv from 'dotenv';

dotenv.config();

const seedPermissions = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);

        const permissions = [
            {
                name: 'view_users',
                description: 'Permission to view user details',
            },
            {
                name: 'edit_users',
                description: 'Permission to edit user details',
            },
            {
                name: 'delete_users',
                description: 'Permission to delete users',
            },
            {
                name: 'view_roles',
                description: 'Permission to view role details',
            },
            {
                name: 'edit_roles',
                description: 'Permission to edit role details',
            },
            {
                name: 'delete_roles',
                description: 'Permission to delete roles',
            },
            {
                name: 'view_permissions',
                description: 'Permission to view permission details',
            },
            {
                name: 'edit_permissions',
                description: 'Permission to edit permission details',
            },
            {
                name: 'delete_permissions',
                description: 'Permission to delete permissions',
            },
        ];

        for (const permission of permissions) {
            const existingPermission = await Permission.findOne({ name: permission.name });
            if (existingPermission) {
                console.log(`Permission "${permission.name}" already exists`);
                continue;
            }
            const newPermission = new Permission(permission);
            await newPermission.save();
            console.log(`Permission "${permission.name}" created successfully`);
        }
    } catch (error) {
        console.error('Error seeding permissions:', error.message);
    } finally {
        await mongoose.connection.close();
    }
};

export default seedPermissions;

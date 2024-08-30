import mongoose from 'mongoose';
import Permission from '../models/permission.model.js';
import dotenv from 'dotenv';

dotenv.config();

const seedPermissions = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);

        const permissions = [
            {name: 'view_user', description: 'Permission to view user details'},
            {name: 'edit_user', description: 'Permission to edit user details'},
            {name: 'delete_user', description: 'Permission to delete users'},
            {name: 'view_role', description: 'Permission to view role details'},
            {name: 'edit_role', description: 'Permission to edit role details'},
            {name: 'delete_role', description: 'Permission to delete roles'},
            {name: 'view_permission', description: 'Permission to view permission details'},
            {name: 'edit_permission', description: 'Permission to edit permission details'},
            {name: 'delete_permission', description: 'Permission to delete permissions'},
            // Category Permissions
            {name: 'read_category', description: 'Permission to read category'},
            {name: 'create_category', description: 'Permission to create category'},
            {name: 'edit_category', description: 'Permission to edit category'},
            {name: 'delete_category', description: 'Permission to delete category'},
            // Product Permissions
            {name: 'read_product', description: 'Permission to read product'},
            {name: 'create_product', description: 'Permission to create product'},
            {name: 'edit_product', description: 'Permission to edit product'},
            {name: 'delete_product', description: 'Permission to delete product'},
             // Order Permissions
            {name: 'read_order', description: 'Permission to read order'},
            {name: 'create_order', description: 'Permission to create order'},
            {name: 'edit_order', description: 'Permission to edit order'},
            {name: 'delete_order', description: 'Permission to delete order'},
        ];

        await Promise.all(permissions.map(async (permission) => {
            const existingPermission = await Permission.findOne({name: permission.name});
            if (!existingPermission) {
                await new Permission(permission).save();
                console.log(`Permission "${permission.name}" created successfully`);
            } else {
                console.log(`Permission "${permission.name}" already exists`);
            }
        }));

        console.log('All permissions seeded successfully');
    } catch (error) {
        console.error('Error seeding permissions:', error.message);
    } finally {
        await mongoose.connection.close();
    }
};

export default seedPermissions;

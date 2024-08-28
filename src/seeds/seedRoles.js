import mongoose from 'mongoose';
import Role from '../models/role.model.js';
import dotenv from 'dotenv';

dotenv.config();

const seedRoles = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, );

        const roles = [
            {
                name: 'user',
                description: 'Default role assigned to regular users',
            },
            {
                name: 'admin',
                description: 'Role assigned to administrators with full access',
            },
        ];

        // Insert roles into the database
        for (const role of roles) {

            const existingRole = await Role.findOne({ name: role.name });
            if (existingRole) {
                console.log(`Role "${role.name}" already exists`);
                continue;
            }
            const newRole = new Role(role);
            await newRole.save();
            console.log(`Role "${role.name}" created successfully`);
        }
    } catch (error) {
        console.error('Error seeding roles:', error.message);
    } finally {
        await mongoose.connection.close();
    }
};

export default seedRoles;
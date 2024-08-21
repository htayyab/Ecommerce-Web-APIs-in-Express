import mongoose from 'mongoose';
import Role from '../models/role.model.js';
import User from '../models/user.model.js';
import Employee from '../models/employee.model.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const seedUser = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);

        let adminRole = await Role.findOne({ name: 'admin' }).exec();
        if (!adminRole) {
            adminRole = await Role.create({
                name: 'admin',
                description: 'Role assigned to administrators with full access'
            });
        }

        const password = 'password123';
        const hashedPassword = await bcrypt.hash(password, 12);

        const users = [
            { firstName: 'Talha'  , email: 'talha@gmail.com', password: hashedPassword, role: adminRole._id },
            { firstName: 'Tayyab', email: 'tayyab@gmail.com', password: hashedPassword, role: adminRole._id }
        ];

        const createdUsers = await User.insertMany(users);

        const employees = createdUsers.map(user => ({
            userId: user._id,
            status: 'active'
        }));

        await Employee.insertMany(employees);

        console.log('Users and Employees seeded successfully');
    } catch (error) {
        console.error('Error seeding users and employees:', error.message);
    } finally {
        await mongoose.connection.close();
    }
};

export default seedUser;

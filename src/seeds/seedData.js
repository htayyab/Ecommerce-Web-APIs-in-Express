import seedRoles from './seedRoles.js';
import seedPermissions from './seedPermissions.js';
import seedRolePermission from './seedRolePermission.js';
import seedUser from './seedUser.js';

const seedData = async () => {
    try {
        await seedRoles();
        await seedPermissions();
        await seedRolePermission();
        await seedUser();

        console.log('All seeding operations completed successfully.');
    } catch (error) {
        console.error('Error during seeding:', error.message);
    }
};

seedData();

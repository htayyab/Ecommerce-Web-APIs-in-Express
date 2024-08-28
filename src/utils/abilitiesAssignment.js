import {AbilityBuilder, createMongoAbility} from "@casl/ability";
import RolePermission from '../models/rolePermission.model.js';

async function getPermissionsForRole(roleId) {
    const rolePermissions = await RolePermission.find({roleId}).populate('permissionId');
    return rolePermissions.map(rolePermission => rolePermission.permissionId.name);
}

export default async function defineAbilitiesFor(user) {
    const {can, cannot, build} = new AbilityBuilder(createMongoAbility);

    const permissions = await getPermissionsForRole(user.role._id);
    permissions.forEach(permission => {
        const [action, resource] = permission.split('_');
        if (action && resource) {
            can(action, resource.toLowerCase());
        } else {
            console.error(`Invalid permission format: ${permission}`);
        }
    });

    return build();
}
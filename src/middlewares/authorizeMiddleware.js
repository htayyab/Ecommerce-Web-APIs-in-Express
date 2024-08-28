import defineAbilitiesFor from '../utils/abilitiesAssignment.js';

export default function authorizeMiddleware(action, resource) {
    return async (req, res, next) => {
        try {
            const ability = await defineAbilitiesFor(req.user);

            if (ability.can(action, resource)) {
                
                return next();
            }
            return res.status(403).json({message: 'Forbidden'});
            
            

        } catch (error) {
            return res.status(500).json({message: `Server error: ${error.message}`});
        }
    };
}

import { validationResult } from 'express-validator';

 const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let error = {};
        errors.array().map((err) => (error[err.param] = err.msg));
        return res.status(422).json({
            status: 'error',
            error,
        });
    }
     next();
};

 export default handleValidationErrors;
import { Request, Response, NextFunction } from 'express';
const allowedMethods = async (request: Request, response: Response, next: NextFunction) => {
    // List of allowed HTTP methods
    const Methods = ['OPTIONS', 'HEAD', 'CONNECT', 'GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

    // Checking if the requested method is not allowed
    if (!Methods.includes(request.method)) {
        // Sending an error response with status code 405 and a message indicating the not allowed method
        response.status(405).send(`${request.method} not allowed`);
    } else {
        // Calling the next middleware function if the requested method is allowed
        next();
    }
};

export { allowedMethods };

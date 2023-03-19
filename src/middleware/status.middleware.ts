import { Request, Response, NextFunction } from 'express';
import Logger from '../utils/Logger';

export const getStatus = (request: Request, response: Response, next: NextFunction) => {
    /** Log the req */
    Logger.info(
        `REQUEST: [${request.method}] - URL: [${request.url}] - IP: [${request.socket.remoteAddress}]`
    );

    response.on('finish', () => {
        /** Log the res */
        Logger.info(
            `RESPONSE: [${request.method}] - URL: [${request.url}] - IP: [${request.socket.remoteAddress}] - STATUS: [${response.statusCode}]`
        );
    });

    next();
};

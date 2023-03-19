import { NextFunction, Request, Response } from 'express';

import { registerUserService, verifyEmailService } from './../services/user.service';

const userRegistration = async (req: Request, res: Response) => {
    try {
        const { email, password, firstName, lastName } = req.body;

        const result = await registerUserService({ email, password, firstName, lastName });

        const { status, error, message } = result;

        if (error) {
            return res.status(status).json({
                error,
                message
            });
        }

        return res.status(200).json({
            result
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: 'An error occurred while registering the user.'
        });
    }
};

export const userVerification = async (req: Request, res: Response) => {
    const { id, otp } = req.body;
    try {
        const result = await verifyEmailService(id, otp);

        const { status, error, message } = result;

        if (error) {
            return res.status(status).json({
                error,
                message
            });
        }

        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: true, message: 'Internal server error.' });
    }
};

const userAuthentication = (req: Request, res: Response, next: NextFunction) => {
    res.send('LOGIN');
};

const userProfile = (req: Request, res: Response, next: NextFunction) => {
    res.send('PROFILE');
};

const userLogout = (req: Request, res: Response, next: NextFunction) => {
    res.send('LOGOUT');
};

export default { userRegistration, userVerification, userAuthentication, userProfile, userLogout };

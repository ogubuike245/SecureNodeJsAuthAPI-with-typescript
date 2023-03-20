import { NextFunction, Request, Response } from 'express';

const handShake = async (req: Request, res: Response) => {
    res.status(200).json('WELCOME TO USER SECTION');
};
const userProfile = (req: Request, res: Response, next: NextFunction) => {
    res.send('PROFILE');
};

export default { handShake, userProfile };

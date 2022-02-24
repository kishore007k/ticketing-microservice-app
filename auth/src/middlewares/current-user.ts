import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface CurrentUserPayload {
	id: string;
	email: string;
}

// This middleware will check if there is a current user
// and attach it to the request object
declare global {
	namespace Express {
		interface Request {
			currentUser?: CurrentUserPayload;
		}
	}
}

export const currentUser = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (!req.session?.jwt) {
		return next();
	}

	try {
		const payload = jwt.verify(
			req.session.jwt,
			process.env.JWT_KEY!
		) as CurrentUserPayload;
		req.currentUser = payload;
	} catch (error) {}

	next();
};

import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/custom-error";

// Note:
// By using the "throw new Error" statement, we are simulating an error
// that will be handled by the error-handler middleware.

export const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err instanceof CustomError) {
		return res.status(err.statusCode).send({ errors: err.serializeErrors() });
	}

	return res.status(400).send({
		errors: [
			{
				message: "Something went wrong",
			},
		],
	});
};

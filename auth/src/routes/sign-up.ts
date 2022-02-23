import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { DatabaseConnectionError } from "../errors/database-connection-error";
import { RequestValidationError } from "../errors/request-validation-error";

const router = express.Router();

const validationStep = [
	body("email").isEmail().withMessage("Email must be valid"),
	body("password")
		.trim()
		.isLength({ min: 4, max: 12 })
		.withMessage("Password must be valid"),
];

router.post(
	"/api/users/signup",
	validationStep,
	(req: Request, res: Response) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			throw new RequestValidationError(errors.array());
		}

		const { email, password } = req.body;

		throw new DatabaseConnectionError();

		return res.send({ message: "Signup success", email, password });
	}
);

export { router as signUpRouter };

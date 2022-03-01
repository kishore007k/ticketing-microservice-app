import express, { Request, Response } from "express";
import { body } from "express-validator";
import { BadRequestError, validateRequest } from "@kishore_007k/common";
import { User } from "../models/user";
import { Password } from "../services/password";
import jwt from "jsonwebtoken";

const router = express.Router();

const validationStep = [
	body("email").isEmail().withMessage("Email must be valid"),
	body("password").trim().notEmpty().withMessage("You must supply a password"),
];

router.post(
	"/api/users/signin",
	validationStep,
	validateRequest,
	async (req: Request, res: Response) => {
		const { email, password } = req.body;

		const existingUser = await User.findOne({ email });

		if (!existingUser) {
			throw new BadRequestError("Invalid credentials");
		}

		const isValidPassword = await Password.compare(
			existingUser.password,
			password
		);

		if (!isValidPassword) {
			throw new BadRequestError("Invalid credentials");
		}

		// Generate JWT
		const userJwt = jwt.sign(
			{
				id: existingUser.id,
				email: existingUser.email,
			},
			process.env.JWT_KEY!,
			{
				expiresIn: "1h",
			}
		);

		// Store it on session object
		req.session = {
			jwt: userJwt,
		};

		return res.status(200).send(existingUser);
	}
);

export { router as signInRouter };

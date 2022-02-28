import express, { Request, Response } from "express";
import { currentUser } from "@kishore_007k/common";

const router = express.Router();

router.get(
	"/api/users/currentuser",
	currentUser,
	(req: Request, res: Response) => {
		if (!req.currentUser) {
			return res.send({ currentUser: null });
		}

		return res.send({ currentUser: req.currentUser || null });
	}
);

export { router as currentUserRouter };

import express, { Request, Response } from "express";

const router = express.Router();

router.post("/api/users/signout", (req: Request, res: Response) => {
	req.session = null;
	res.send({ message: "You have been signed out." });
});

export { router as signOutRouter };

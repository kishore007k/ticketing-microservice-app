import {
	NotAuthorizedError,
	NotFoundError,
	requireAuth,
	validateRequest,
} from "@kishore_007k/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Ticket } from "../models/ticket";

const router = express.Router();

const validationStep = [
	body("title").not().isEmpty().withMessage("Title is required"),
	body("price")
		.isFloat({ gt: 0 })
		.withMessage("Price is required & greater than 0"),
];

router.put(
	"/api/tickets/:id",
	requireAuth,
	validationStep,
	validateRequest,
	async (req: Request, res: Response) => {
		const ticket = await Ticket.findById(req.params.id);
		if (!ticket) {
			throw new NotFoundError();
		}

		if (ticket.userId !== req.currentUser!.id) {
			throw new NotAuthorizedError();
		}

		if (req.body.title) {
			ticket.set({ title: req.body.title });
		}

		if (req.body.price) {
			ticket.set({ price: req.body.price });
		}

		await ticket.save();

		res.send(ticket);
	}
);

export { router as updateTicketRouter };

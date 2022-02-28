import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";

it("has a route handler listening to /api/tickets for post requests", async () => {
	const response = await request(app).post("/api/tickets").send({});
	expect(response.status).not.toEqual(404);
});

it("can only be accessed if the user is signed in", async () => {
	await request(app).post("/api/tickets").send({}).expect(401);
});

it("return a status other than 401 is the user is signed in", async () => {
	const response = await request(app)
		.post("/api/tickets")
		.set("Cookie", signin())
		.send({});

	expect(response.status).not.toEqual(401);
});

it("returns an error if an invalid title is provided", async () => {
	await request(app)
		.post("/api/tickets")
		.set("Cookie", signin())
		.send({
			title: "",
			price: 10,
		})
		.expect(400);

	await request(app)
		.post("/api/tickets")
		.set("Cookie", signin())
		.send({
			price: 10,
		})
		.expect(400);
});

it("returns an error if an invalid prize is provided", async () => {
	await request(app)
		.post("/api/tickets")
		.set("Cookie", signin())
		.send({
			title: "This is a title",
			price: -10,
		})
		.expect(400);

	await request(app)
		.post("/api/tickets")
		.set("Cookie", signin())
		.send({
			title: "This is a title",
		})
		.expect(400);
});

it("creates a ticket with valid inputs", async () => {
	// add in a check to make sure a ticket was saved
	let tickets = await Ticket.find({});
	expect(tickets.length === 0);

	await request(app)
		.post("/api/tickets")
		.set("Cookie", signin())
		.send({
			title: "This is a title",
			price: 20,
		})
		.expect(201);

	tickets = await Ticket.find({});

	expect(tickets.length === 1);
});

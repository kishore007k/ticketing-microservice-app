import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";

it("returns a 404 if the provided Id does not exist", async () => {
	const id = new mongoose.Types.ObjectId().toHexString();
	await request(app)
		.put(`/api/tickets/${id}`)
		.set("Cookie", signin())
		.send({
			title: "dasfas",
			price: 45,
		})
		.expect(404);
});

it("returns a 401 if the user is not authenticated", async () => {
	const id = new mongoose.Types.ObjectId().toHexString();
	await request(app)
		.put(`/api/tickets/${id}`)
		.send({
			title: "dasfas",
			price: 45,
		})
		.expect(401);
});

it("returns a 401 if the user does not own the ticket", async () => {
	const response = await request(app)
		.post("/api/tickets")
		.set("Cookie", signin())
		.send({
			title: "asdfasdf",
			price: 20,
		});

	await request(app)
		.put(`/api/tickets/${response.body.id}`)
		.set("Cookie", signin())
		.send({
			title: "asdfasdf",
			price: 30,
		})
		.expect(401);

	await request(app)
		.get(`/api/tickets/${response.body.id}`)
		.set("Cookie", signin())
		.send({
			title: "asdfasdf",
			price: 20,
		});

	expect(response.body.title).toEqual("asdfasdf");
	expect(response.body.price).toEqual(20);
});

it("returns a 400 if the user provides an invalid title or price", async () => {
	const cookie = signin();
	const response = await request(app)
		.post("/api/tickets")
		.set("Cookie", cookie)
		.send({
			title: "asdfasdf",
			price: 20,
		})
		.expect(201);

	await request(app)
		.put(`/api/tickets/${response.body.id}`)
		.set("Cookie", cookie)
		.send({
			title: "",
			price: 30,
		})
		.expect(400);

	await request(app)
		.put(`/api/tickets/${response.body.id}`)
		.set("Cookie", cookie)
		.send({
			title: "asdfasdf",
			price: -10,
		})
		.expect(400);
});

it("updates the ticket provided valid inputs", async () => {
	const cookie = signin();
	const response = await request(app)
		.post("/api/tickets")
		.set("Cookie", cookie)
		.send({
			title: "asdfasdf",
			price: 20,
		})
		.expect(201);

	await request(app)
		.put(`/api/tickets/${response.body.id}`)
		.set("Cookie", cookie)
		.send({
			title: "new title",
			price: 100,
		})
		.expect(200);

	const ticketResponse = await request(app)
		.get(`/api/tickets/${response.body.id}`)
		.send();

	expect(ticketResponse.body.title).toEqual("new title");
	expect(ticketResponse.body.price).toEqual(100);
});

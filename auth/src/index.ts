import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/sign-in";
import { signUpRouter } from "./routes/sign-up";
import { signOutRouter } from "./routes/sign-out";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import mongoose from "mongoose";
import cookieSession from "cookie-session";

const app = express();

app.set("trust proxy", true); // trust first proxy for https (ingress ngx)

app.use(json());
app.use(
	cookieSession({
		signed: false,
		secure: true, // only send cookies over https
	})
);

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.all("*", async (req, res) => {
	throw new NotFoundError();
});

// Error Handler
app.use(errorHandler);

const start = async () => {
	if (!process.env.JWT_KEY) {
		throw new Error("JWT_KEY must be defined");
	}

	try {
		await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
	} catch (error) {
		console.log(error);
	}

	app.listen(3000, () => {
		console.log("Listening on http://localhost:3000");
	});
};

start();

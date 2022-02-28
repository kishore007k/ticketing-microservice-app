import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/sign-in";
import { signUpRouter } from "./routes/sign-up";
import { signOutRouter } from "./routes/sign-out";
import { NotFoundError, errorHandler } from "@kishore_007k/common";
import cookieSession from "cookie-session";

const app = express();

app.set("trust proxy", true); // trust first proxy for https (ingress ngx)

app.use(json());
app.use(
	cookieSession({
		signed: false,
		secure: process.env.NODE_ENV !== "test", // only send cookies over https
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

export { app };

import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import { NotFoundError, errorHandler, currentUser } from "@kishore_007k/common";
import cookieSession from "cookie-session";
import { createTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";
import { indexTicketRouter } from "./routes";
import { updateTicketRouter } from "./routes/update";

const app = express();

app.set("trust proxy", true); // trust first proxy for https (ingress ngx)

app.use(json());
app.use(
	cookieSession({
		signed: false,
		secure: process.env.NODE_ENV !== "test", // only send cookies over https
	})
);

app.use(currentUser); // Check if user is signed in

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

app.all("*", async (req, res) => {
	throw new NotFoundError();
});

// Error Handler
app.use(errorHandler);

export { app };

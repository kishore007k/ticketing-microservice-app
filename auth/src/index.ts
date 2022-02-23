import express from "express";
import { json } from "body-parser";

const app = express();

app.use(json());

app.listen(4000, () => {
  console.log("Listening on http://localhost:4000");
});
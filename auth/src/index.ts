import express from "express";
import { json } from "body-parser";

const app = express();

app.use(json());

app.get("/api/users/currentuser", (req, res) => {
  res.send({
    name: "John Doe",
    email: "JohnDoe@gmail.com",
  });
})

app.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});
import express from "express";

const router = express.Router();

router.get("/api/users/currentuser", (req, res) => {
  res.send({
    name: "John Doe",
    email: "JohnDoe@gmail.com",
  });
});

export { router as currentUserRouter };
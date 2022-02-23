import express from "express";

const router = express.Router();

router.post("/api/users/signout", (req, res) => {
  res.send({
    name: "John Doe",
    email: "JohnDoe@gmail.com",
  });
});

export { router as signOutRouter };
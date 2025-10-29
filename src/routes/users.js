import { Router } from "express";
import { mockUsers } from "../utils/constants.js";
import bcrypt from "bcryptjs";
import { User } from "../mongoose/schemas/userSchema.js";
import { Task } from "../mongoose/schemas/tasksSchema.js";

const router = Router();

router.get("/users", async (req, res) => {
  return res.status(200).send(await User.find());
});

router.post("/users/new", async (req, res) => {
  const {
    body: { username, email, password },
  } = req;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const data = { username, email, hashedPassword };
  const newUser = new User(data);
  try {
    const savedUser = await newUser.save();
    if (!savedUser) return new Error("Saving user failed");
    return res.status(200).send(savedUser);
  } catch (err) {
    if (err.name === "MongoServerError" && err.code === 11000) {
      console.log(err.keyValue);
      return res
        .status(400)
        .send(
          `Duplicate field Value: ${Object.keys(err.keyValue)[0]} "${
            Object.values(err.keyValue)[0]
          }" already exists.`
        );
    }
    console.log(err);
    res.sendStatus(500);
  }
});

router.post("/users/login", async (req, res) => {
  const {
    body: { username, password },
  } = req;
  const storedUsername = User.findOne(username);
  const storedHasedPassword = User.findOne(password);
});

export default router;

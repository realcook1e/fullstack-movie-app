const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");
const authRouter = require("./router/authRouter.js");
const roleRouter = require("./router/roleRouter.js");
const userRouter = require("./router/userRouter.js");
const movieRouter = require("./router/movieRouter.js");
const reviewRouter = require("./router/reviewRouter.js");
const feedbackRouter = require("./router/feedbackRouter.js");

const PORT = 5000;
const DB_URL =
	"mongodb+srv://moviem191:H38kfz9kIQi4YyCq@cluster0.vczszun.mongodb.net/moviesDB?retryWrites=true&w=majority";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/roles", roleRouter);
app.use("/api/movies", movieRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/feedbacks", feedbackRouter);

const start = async () => {
	try {
		await mongoose.connect(DB_URL);
		app.listen(PORT, () => {
			console.log(`Server started at port ${PORT}`);
		});
	} catch (e) {
		console.log(e);
	}
};

start();

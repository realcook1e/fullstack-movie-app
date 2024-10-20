import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRouter from "./router/authRouter";
import roleRouter from "./router/roleRouter";
import userRouter from "./router/userRouter";
import movieRouter from "./router/movieRouter";
import reviewRouter from "./router/reviewRouter";
import feedbackRouter from "./router/feedbackRouter";

const PORT = 5000;
const DB_URL =
	"mongodb+srv://moviem191:H38kfz9kIQi4YyCq@cluster0.vczszun.mongodb.net/moviesDB?retryWrites=true&w=majority";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/images", express.static("./images"));

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

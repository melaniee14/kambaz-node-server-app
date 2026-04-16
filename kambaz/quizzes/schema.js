import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
   _id: String,
   title: String,
   course: String,
   available: String,
   due: String,
   points: Number,
   score: Number,
   questions: Number,
   desc: String,
   newQuiz: Boolean,
   published: Boolean
 },
 { collection: "quizzes" }
);
export default quizSchema;
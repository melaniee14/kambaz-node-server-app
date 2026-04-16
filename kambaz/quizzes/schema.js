import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  _id: String,
  title: String,
  course: String,
  quizType: { type: String, default: "Graded Quiz" },
  points: { type: Number, default: 0 },
  assignmentGroup: { type: String, default: "Quizzes" },
  shuffleAnswers: { type: Boolean, default: true },
  timeLimit: { type: Number, default: 20 },
  multipleAttempts: { type: Boolean, default: false },
  numberOfAttempts: { type: Number, default: 1 },
  showCorrectAnswers: { type: String, default: "Immediately" },
  accessCode: { type: String, default: "" },
  oneQuestionAtATime: { type: Boolean, default: true },
  webcamRequired: { type: Boolean, default: false },
  lockQuestionsAfter: { type: Boolean, default: false },
  due: { type: String, default: "" },
  available: { type: String, default: "" },
  until: { type: String, default: "" },
  published: { type: Boolean, default: false },
  desc: { type: String, default: "New Quiz Description" },
}, { collection: "quizzes" });

export default  quizSchema;
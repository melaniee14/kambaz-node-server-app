import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  id: { type: String },
  text: { type: String, default: "" },
  correct: { type: Boolean, default: false },
}, { _id: false });

const quizQuestionSchema = new mongoose.Schema({
  id: { type: String },
  type: { type: String, enum: ["multiple_choice", "true_false", "fill_in_blank"], default: "multiple_choice" },
  title: { type: String, default: "New Question" },
  points: { type: Number, default: 1 },
  question: { type: String, default: "" },
  choices: { type: [answerSchema], default: [] },
  correctAnswer: { type: String, default: "true" },
  blanks: { type: [String], default: [""] },
}, { _id: false });

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
  questions: { type: [quizQuestionSchema], default: [] },
}, { collection: "quizzes" });

export default quizSchema;
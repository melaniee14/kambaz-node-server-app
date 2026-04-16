import QuizzesDao from "./dao.js";
import { v4 as uuid } from "uuid";

export default function QuizzesRoutes(app) {
    const dao = QuizzesDao();

    const createQuizForCourse = async (req, res) => {
        const { courseId } = req.params;
        const quiz = {
            ...req.body,
            course: courseId,
            _id: uuid()
            
        };
        const newQuiz = await dao.createQuiz(quiz);
        res.send(newQuiz);
    }

    const deleteQuiz = async (req, res) => {
        const { qid } = req.params;
        const status = await dao.deleteQuiz(qid);
        res.send(status);
      }
      

    const findQuizzesForCourse = async (req, res) => {
        const { courseId } = req.params;
        const quizzes = await dao.findQuizzesForCourse(courseId);
        res.json(quizzes);
    }

    const updateQuiz = async (req, res) => {
        const { qid } = req.params;
        const quizUpdates = req.body;
        const status = await dao.updateQuiz(qid, quizUpdates);
        res.send(status);
    }
      


 

    app.delete("/api/quizzes/:qid", deleteQuiz);
    app.post("/api/courses/:courseId/quizzes/:qid", createQuizForCourse);
    app.get("/api/courses/:courseId/quizzes", findQuizzesForCourse);
    app.put("/api/quizzes/:qid", updateQuiz);
}
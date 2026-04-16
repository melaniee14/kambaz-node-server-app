import QuizzesDao from "./dao.js";

export default function QuizzesRoutes(app) {
  const { updateQuiz, deleteQuiz, createQuiz, findQuizzesForCourse } = QuizzesDao();

  app.post("/api/courses/:courseId/quizzes", async (req, res) => {
    const { courseId } = req.params;
    const quiz = { ...req.body, course: courseId };
    const newQuiz = await createQuiz(quiz);
    res.json(newQuiz);
  });

  app.get("/api/courses/:courseId/quizzes", async (req, res) => {
    const { courseId } = req.params;
    const quizzes = await findQuizzesForCourse(courseId);
    res.json(quizzes);
  });

  app.put("/api/quizzes/:qid", async (req, res) => {
    const { qid } = req.params;
    const quizUpdates = req.body;
    await updateQuiz(qid, quizUpdates);
    res.json(quizUpdates);
  });

  app.delete("/api/quizzes/:qid", async (req, res) => {
    const { qid } = req.params;
    await deleteQuiz(qid);
    res.sendStatus(200);
  });
}
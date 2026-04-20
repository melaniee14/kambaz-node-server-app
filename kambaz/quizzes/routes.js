import QuizzesDao from "./dao.js";

export default function QuizzesRoutes(app, db) {
  const { updateQuiz, updateScore, deleteQuiz, createQuiz, findQuizzesForCourse } = QuizzesDao(db);

  app.post("/api/courses/:courseId/quizzes", async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser || currentUser.role === "STUDENT") return res.sendStatus(403);
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
    const currentUser = req.session["currentUser"];
    if (!currentUser || currentUser.role === "STUDENT") return res.sendStatus(403);
    const { qid } = req.params;
    const updated = await updateQuiz(qid, req.body);
    res.json(updated);
  });

  app.post("/api/quizzes/:qid/score", async (req, res) => {
    const currentUser = req.session["currentUser"];
    if(!currentUser) return res.sendStatus(403);
    const { qid } = req.params;
    const score = await updateScore(qid, req.body);
    res.json(score);
  })

  app.delete("/api/quizzes/:qid", async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser || currentUser.role === "STUDENT") return res.sendStatus(403);
    const { qid } = req.params;
    await deleteQuiz(qid);
    res.sendStatus(200);
  });
}
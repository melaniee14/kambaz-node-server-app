import model from "./model.js";

export default function QuizzesDao(db) {
  function updateQuiz(qid, quizUpdates) {
    return model.findByIdAndUpdate(qid, { $set: quizUpdates }, { new: true });
  }

  function deleteQuiz(qid) {
    return model.deleteOne({ _id: qid });
  }

  function createQuiz(quiz) {
    const newQuiz = {
      ...(quiz._id && { _id: quiz._id }),
      title: quiz.title ?? "New Quiz",
      course: quiz.course,
      quizType: quiz.quizType ?? "Graded Quiz",
      points: quiz.points ?? 0,
      assignmentGroup: quiz.assignmentGroup ?? "Quizzes",
      shuffleAnswers: quiz.shuffleAnswers ?? true,
      timeLimit: quiz.timeLimit ?? 20,
      multipleAttempts: quiz.multipleAttempts ?? false,
      numberOfAttempts: quiz.numberOfAttempts ?? 1,
      showCorrectAnswers: quiz.showCorrectAnswers ?? "Immediately",
      accessCode: quiz.accessCode ?? "",
      oneQuestionAtATime: quiz.oneQuestionAtATime ?? true,
      webcamRequired: quiz.webcamRequired ?? false,
      lockQuestionsAfter: quiz.lockQuestionsAfter ?? false,
      due: quiz.due ?? "",
      available: quiz.available ?? "",
      until: quiz.until ?? "",
      published: quiz.published ?? false,
      desc: quiz.desc ?? "New Quiz Description",
    };
    return model.create(newQuiz);
  }

  function findQuizzesForCourse(courseId) {
    return model.find({ course: courseId });
  }

  return { updateQuiz, deleteQuiz, createQuiz, findQuizzesForCourse };
}
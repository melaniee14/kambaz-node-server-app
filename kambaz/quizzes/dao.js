import model from "./model.js"

export default function QuizzesDao() {

function updateQuiz(qid, quizUpdates) {
    return model.updateOne({_id: qid}, {$set: quizUpdates}); 
}

function deleteQuiz(qid) {
    return model.deleteOne({_id : qid});
}


function createQuiz(quiz) {
    const newQuiz= {
      _id: quiz._id,
      title: quiz.title,
      course: quiz.course,
      points: quiz.points,
      newQuiz: true,
      score: quiz.score ?? 0,
      questions: quiz.questions ?? 0,
      published: false,
      desc: "New Quiz Description",
      available: quiz.available,
      due: quiz.due
      };
    
    return model.create(newQuiz);
}

function findQuizzesForCourse(courseId) {
    return model.find({ course: courseId });
  }

return { updateQuiz, deleteQuiz, createQuiz, findQuizzesForCourse};
}
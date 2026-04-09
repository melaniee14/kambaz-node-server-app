import EnrollmentsDao from "./dao.js"

export default function EnrollmentsRoutes(app) {
    const dao = EnrollmentsDao();

    const enrollInCourse = (req, res) => {
        const { courseId } = req.params;
        const currentUser = req.session["currentUser"];

        dao.enrollUserInCourse(currentUser._id, courseId);
        res.sendStatus(200);
    }

    const unenrollInCourse = (req, res) => {
        const { courseId } = req.params;
        const currentUser = req.session["currentUser"];

        dao.unenrollUserFromCourse(currentUser._id, courseId);
        res.sendStatus(200);
    }

    app.post("/api/courses/:courseId/enroll", enrollInCourse);
    app.delete("/api/courses/:courseId/enroll", unenrollInCourse);
}
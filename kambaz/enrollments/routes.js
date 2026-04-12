import EnrollmentsDao from "./dao.js"

export default function EnrollmentsRoutes(app) {
    const dao = EnrollmentsDao();

    const enrollInCourse = async (req, res) => {
        const { courseId } = req.params;


        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.sendStatus(401);
            return;
        }

        const userId = currentUser._id;

        const status = await dao.enrollUserInCourse(userId, courseId);
        res.send(status);

    }

    const unenrollInCourse = async (req, res) => {
        const { courseId } = req.params;


        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.sendStatus(401);
            return;
        }
        const userId = currentUser._id;



        const status = await dao.unenrollUserFromCourse(userId, courseId);
        res.send(status);
    }

    const findEnrollmentsForUser = async (req, res) => {
        let { userId } = req.params;
        if (userId === "current") {
            const currentUser = req.session["currentUser"];
            if (!currentUser) {
                res.sendStatus(401);
                return;
            }
            userId = currentUser._id;
        }
        const enrollments = await dao.findEnrollmentsForUser(userId);
        res.json(enrollments);
    }

    app.post("/api/courses/:courseId/enroll", enrollInCourse);
    app.delete("/api/courses/:courseId/enroll", unenrollInCourse);
    app.get("/api/users/:userId/enrollments", findEnrollmentsForUser);
}
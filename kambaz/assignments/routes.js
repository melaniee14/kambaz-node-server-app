import AssignmentsDao from "./dao.js";
import { v4 as uuid } from "uuid";


export default function AssignmentsRoutes(app, db) {
    const dao = AssignmentsDao(db);

    const createAssignmentForCourse = (req, res) => {
        const { courseId } = req.params;
        const assignment = {
            ...req.body,
            course: courseId,
            _id: uuid()
            
        };
        const newAssignment = dao.createAssignment(assignment);
        res.send(newAssignment);
    }

    const deleteAssignment = (req, res) => {
        const { aid } = req.params;
        const status = dao.deleteAssignment(aid);
        res.send(status);
      }
      

    const findAssignmentsForCourse = (req, res) => {
        const { courseId } = req.params;
        const assignments = dao.findAssignmentsForCourse(courseId);
        res.json(assignments);
    }

    const updateAssignment = async (req, res) => {
        const { aid } = req.params;
        const assignmentUpdates = req.body;
        const status = await dao.updateAssignment(aid, assignmentUpdates);
        res.send(status);
    }
      


 

    app.delete("/api/assignments/:aid", deleteAssignment);
    app.post("/api/courses/:courseId/assignments/:aid", createAssignmentForCourse);
    app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
    app.put("/api/assignments/:aid", updateAssignment);
}
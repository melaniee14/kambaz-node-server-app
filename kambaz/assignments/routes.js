import AssignmentsDao from "./dao.js";
import { v4 as uuid } from "uuid";


export default function AssignmentsRoutes(app) {
    const dao = AssignmentsDao();

    const createAssignmentForCourse = async (req, res) => {
        const { courseId, aid} = req.params;
        const assignment = {
            ...req.body,
            course: courseId,
            _id: aid
            
        };
        const newAssignment = await dao.createAssignment(assignment);
        res.send(newAssignment);
    }

    const deleteAssignment = async (req, res) => {
        const { aid } = req.params;
        const status = await dao.deleteAssignment(aid);
        res.send(status);
      }
      

    const findAssignmentsForCourse = async (req, res) => {
        const { courseId } = req.params;
        const assignments = await dao.findAssignmentsForCourse(courseId);
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
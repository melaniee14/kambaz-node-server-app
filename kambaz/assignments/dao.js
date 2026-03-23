

export default function AssignmentsDao(db) {

    function updateAssignment(aid, assignmentUpdates) {
        const { assignments } = db;
        const assignment = assignments.find((assignment) => assignment._id === aid);
        Object.assign(assignment, assignmentUpdates);
        return assignment;
    }


    function deleteAssignment(aid) {
        const { assignments } = db;
        db.assignments = assignments.filter((assignment) => assignment._id !== aid);
    }


    function createAssignment(assignment) {
        const newAssignment = {
            _id: assignment._id,
            title: assignment.title,
            course: assignment.course,
            available: assignment.available ?? "",
            due: assignment.due ?? "",
            points: assignment.points ?? 100,
            desc: "New Assignment Description",
            newAssign: true,
          };
        db.assignments = [...db.assignments, newAssignment];
        return newAssignment;
    }

    function findAssignmentsForCourse(courseId) {
        const { assignments } = db;
        return assignments.filter((assignment) => assignment.course === courseId);
      }

    return { updateAssignment, deleteAssignment, createAssignment, findAssignmentsForCourse};

}
import model from "./model.js"

export default function AssignmentsDao() {

    function updateAssignment(aid, assignmentUpdates) {
        return model.updateOne({_id: aid}, {$set: assignmentUpdates}); 
    }

    function deleteAssignment(aid) {
        return model.deleteOne({_id : aid});
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
        
        return model.create(newAssignment);
    }

    function findAssignmentsForCourse(courseId) {
        return model.find({ course: courseId });
      }

    return { updateAssignment, deleteAssignment, createAssignment, findAssignmentsForCourse};

}
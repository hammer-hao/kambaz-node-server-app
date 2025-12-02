import model from "./model.js";

export default function AssignmentsDao() {
    function findAssignmentsForCourse(courseId) {
        return model.find({ course: courseId });
    }

    function findAssignmentById(assignmentId) {
        return model.findById(assignmentId);
    }

    function createAssignment(courseId, assignment) {
        const newAssignment = {
            ...assignment,
            course: courseId,
        };
        return model.create(newAssignment);
    }

    function updateAssignment(assignmentId, assignmentUpdates) {
        return model.findByIdAndUpdate(assignmentId, assignmentUpdates, {
            new: true,
        });
    }

    function deleteAssignment(assignmentId) {
        return model.deleteOne({ _id: assignmentId });
    }

    return {
        findAssignmentsForCourse,
        findAssignmentById,
        createAssignment,
        updateAssignment,
        deleteAssignment,
    };
}

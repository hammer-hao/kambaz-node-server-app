import { v4 as uuidv4 } from "uuid";

export default function AssignmentsDao(db) {
    if (!db.assignments) {
        db.assignments = [];
    }

    function findAllAssignments() {
        return db.assignments;
    }

    function findAssignmentsForCourse(courseId) {
        const { assignments } = db;
        return assignments.filter(
            (assignment) =>
                assignment.course === courseId ||
                assignment.course === `/Courses/${courseId}`
        );
    }

    function findAssignmentById(assignmentId) {
        const { assignments } = db;
        return assignments.find((assignment) => assignment._id === assignmentId);
    }

    function createAssignment(courseId, assignment) {
        const newAssignment = {
            ...assignment,
            _id: uuidv4(),
            course: assignment.course ?? `/Courses/${courseId}`,
        };
        db.assignments = [...db.assignments, newAssignment];
        return newAssignment;
    }

    function updateAssignment(assignmentId, assignmentUpdates) {
        const { assignments } = db;
        const assignment = assignments.find((a) => a._id === assignmentId);
        if (!assignment) return null;
        Object.assign(assignment, assignmentUpdates);
        return assignment;
    }

    function deleteAssignment(assignmentId) {
        const { assignments } = db;
        db.assignments = assignments.filter(
            (assignment) => assignment._id !== assignmentId
        );
        return { status: "ok" };
    }

    return {
        findAllAssignments,
        findAssignmentsForCourse,
        findAssignmentById,
        createAssignment,
        updateAssignment,
        deleteAssignment,
    };
}

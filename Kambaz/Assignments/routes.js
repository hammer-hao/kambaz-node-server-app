import AssignmentsDao from "./dao.js";

export default function AssignmentsRoutes(app, db) {
    const dao = AssignmentsDao(db);

    const createAssignment = (req, res) => {
        const { courseId } = req.params;
        const newAssignment = dao.createAssignment(courseId, req.body);
        res.json(newAssignment);
    };
    app.post("/courses/:courseId/assignments", createAssignment);

    const findAllAssignments = (req, res) => {
        const assignments = dao.findAllAssignments();
        res.json(assignments);
    };
    app.get("/assignments", findAllAssignments);

    const findAssignmentsForCourse = (req, res) => {
        const { courseId } = req.params;
        const assignments = dao.findAssignmentsForCourse(courseId);
        res.json(assignments);
    };
    app.get("/courses/:courseId/assignments", findAssignmentsForCourse);

    const findAssignmentById = (req, res) => {
        const { assignmentId } = req.params;
        const assignment = dao.findAssignmentById(assignmentId);
        if (!assignment) {
            res.sendStatus(404);
            return;
        }
        res.json(assignment);
    };
    app.get("/assignments/:assignmentId", findAssignmentById);

    const updateAssignment = (req, res) => {
        const { assignmentId } = req.params;
        const updatedAssignment = dao.updateAssignment(assignmentId, req.body);
        if (!updatedAssignment) {
            res.sendStatus(404);
            return;
        }
        res.json(updatedAssignment);
    };
    app.put("/assignments/:assignmentId", updateAssignment);

    const deleteAssignment = (req, res) => {
        const { assignmentId } = req.params;
        dao.deleteAssignment(assignmentId);
        res.sendStatus(200);
    };
    app.delete("/assignments/:assignmentId", deleteAssignment);
}

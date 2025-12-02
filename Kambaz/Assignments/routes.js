import AssignmentsDao from "./dao.js";

export default function AssignmentsRoutes(app) {
    const dao = AssignmentsDao();

    app.get("/api/courses/:cid/assignments", async (req, res) => {
        try {
            const { cid } = req.params;
            const assignments = await dao.findAssignmentsForCourse(cid);
            res.json(assignments);
        } catch (e) {
            console.error("Error in GET /api/courses/:cid/assignments", e);
            res.sendStatus(500);
        }
    });

    app.get("/api/assignments/:aid", async (req, res) => {
        try {
            const { aid } = req.params;
            const assignment = await dao.findAssignmentById(aid);
            if (!assignment) {
                return res.sendStatus(404);
            }
            res.json(assignment);
        } catch (e) {
            console.error("Error in GET /api/assignments/:aid", e);
            res.sendStatus(500);
        }
    });

    app.post("/api/courses/:cid/assignments", async (req, res) => {
        try {
            const { cid } = req.params;
            const assignment = req.body;
            const created = await dao.createAssignment(cid, assignment);
            res.json(created);
        } catch (e) {
            console.error("Error in POST /api/courses/:cid/assignments", e);
            res.sendStatus(500);
        }
    });

    app.put("/api/assignments/:aid", async (req, res) => {
        try {
            const { aid } = req.params;
            const assignmentUpdates = req.body;
            const updated = await dao.updateAssignment(aid, assignmentUpdates);
            if (!updated) {
                return res.sendStatus(404);
            }
            res.json(updated);
        } catch (e) {
            console.error("Error in PUT /api/assignments/:aid", e);
            res.sendStatus(500);
        }
    });

    app.delete("/api/assignments/:aid", async (req, res) => {
        try {
            const { aid } = req.params;
            const status = await dao.deleteAssignment(aid);
            res.json(status);
        } catch (e) {
            console.error("Error in DELETE /api/assignments/:aid", e);
            res.sendStatus(500);
        }
    });
}
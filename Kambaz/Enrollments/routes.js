import EnrollmentsDao from "./dao.js";
import CoursesDao from "../Courses/dao.js";

export default function EnrollmentsRoutes(app, db) {
    const dao = EnrollmentsDao(db);
    const coursesDao = CoursesDao(db);
    const findEnrollmentsForUser = (req, res) => {
        let { userId } = req.params;
        if (userId === "current") {
            const currentUser = req.session["currentUser"];
            if (!currentUser) {
                res.sendStatus(401);
                return;
            }
            userId = currentUser._id;
        }
        const enrollments = dao.findEnrollmentsForUser(userId);
        res.json(enrollments);
    };
    app.get("/api/users/:userId/enrollments", findEnrollmentsForUser);

    // Enroll user in course
    const enrollUserInCourse = (req, res) => {
        let { userId, courseId } = req.params;
        if (userId === "current") {
            const currentUser = req.session["currentUser"];
            if (!currentUser) {
                res.sendStatus(401);
                return;
            }
            userId = currentUser._id;
        }

        const course = coursesDao.findAllCourses().find((c) => c._id === courseId);
        if (!course) {
            res.status(404).send({ message: "Course not found" });
            return;
        }

        const enrollment = dao.enrollUserInCourse(userId, courseId);
        res.json(enrollment);
    };
    app.post(
        "/api/users/:userId/enrollments/:courseId",
        enrollUserInCourse,
    );

    // Unenroll user from course
    const unenrollUserFromCourse = (req, res) => {
        let { userId, courseId } = req.params;
        if (userId === "current") {
            const currentUser = req.session["currentUser"];
            if (!currentUser) {
                res.sendStatus(401);
                return;
            }
            userId = currentUser._id;
        }
        const removed = dao.unenrollUserFromCourse(userId, courseId);
        if (!removed) {
            res.sendStatus(404);
            return;
        }
        res.json(removed);
    };
    app.delete(
        "/api/users/:userId/enrollments/:courseId",
        unenrollUserFromCourse,
    );
}
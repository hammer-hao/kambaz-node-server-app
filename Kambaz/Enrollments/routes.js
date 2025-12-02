import EnrollmentsDao from "./dao.js";
import CoursesDao from "../Courses/dao.js";

export default function EnrollmentsRoutes(app) {
    const dao = EnrollmentsDao();
    const coursesDao = CoursesDao();
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
        const enrollments = await dao.findCoursesForUser(userId);
        res.json(enrollments);
    };
    app.get("/api/users/:userId/enrollments", findEnrollmentsForUser);

    // Enroll user in course
    const enrollUserInCourse = async (req, res) => {
        try {
            let { userId, courseId } = req.params;

            if (userId === "current") {
                const currentUser = req.session["currentUser"];
                if (!currentUser) {
                    return res.sendStatus(401);
                }
                userId = currentUser._id;
            }

            const courses = await coursesDao.findAllCourses();

            const course = courses.find((c) => String(c._id) === String(courseId));

            if (!course) {
                return res.status(404).send({ message: "Course not found" });
            }

            const enrollment = await dao.enrollUserInCourse(userId, courseId);
            res.json(enrollment);
        } catch (e) {
            console.error("Error in enrollUserInCourse:", e);
            res.sendStatus(500);
        }
    };

    app.post(
        "/api/users/:userId/enrollments/:courseId",
        enrollUserInCourse
    );

    const unenrollUserFromCourse = async (req, res) => {
        let { userId, courseId } = req.params;

        if (userId === "current") {
            const currentUser = req.session["currentUser"];
            if (!currentUser) {
                return res.sendStatus(401);
            }
            userId = currentUser._id;
        }

        try {
            const result = await dao.unenrollUserFromCourse(userId, courseId);

            if (!result || result.deletedCount === 0) {
                return res.sendStatus(404);
            }
            res.json(result);
        } catch (e) {
            console.error("Error in unenrollUserFromCourse:", e);
            res.sendStatus(500);
        }
    };
    app.delete("/api/users/:userId/enrollments/:courseId", unenrollUserFromCourse);
}
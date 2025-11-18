import { v4 as uuidv4 } from "uuid";

export default function EnrollmentsDao(db) {
    function findEnrollmentsForUser(userId) {
        return db.enrollments.filter((e) => e.user === userId);
    }

    function enrollUserInCourse(userId, courseId) {
        const { enrollments } = db;

        // avoid duplicate enrollment
        const existing = enrollments.find(
            (e) => e.user === userId && e.course === courseId,
        );
        if (existing) return existing;

        const enrollment = {
            _id: uuidv4(),
            user: userId,
            course: courseId,
        };
        db.enrollments = [...enrollments, enrollment];
        return enrollment;
    }

    function unenrollUserFromCourse(userId, courseId) {
        const { enrollments } = db;
        const toRemove = enrollments.find(
            (e) => e.user === userId && e.course === courseId,
        );
        db.enrollments = enrollments.filter(
            (e) => !(e.user === userId && e.course === courseId),
        );
        return toRemove || null;
    }

    return {
        findEnrollmentsForUser,
        enrollUserInCourse,
        unenrollUserFromCourse,
    };
}
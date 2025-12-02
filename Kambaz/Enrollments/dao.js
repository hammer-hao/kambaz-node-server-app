import model from "./model.js";
export default function EnrollmentsDao() {

    async function findCoursesForUser(userId) {
        console.log("findCoursesForUser → userId =", userId);
        const enrollments = await model.find({ user: userId }).populate("course");
        console.log("findCoursesForUser → enrollments =", enrollments);
        return enrollments.map(e => e.course);
    }

    async function findUsersForCourse(courseId) {
        console.log("findUserseForCourse -> courseId = ", courseId, "")
        const enrollments = await model.find({ course: courseId }).populate("user");
        return enrollments.map((enrollment) => enrollment.user);
    }

    function enrollUserInCourse(userId, courseId) {
        return model.create({
            user: userId,
            course: courseId,
            _id: `${userId}-${courseId}`,
        });
    }
    function unenrollUserFromCourse(user, course) {
        return model.deleteOne({ user, course });
    }

    function unenrollAllUsersFromCourse(courseId) {
        return model.deleteMany({ course: courseId });
    }

    return {
        findCoursesForUser,
        findUsersForCourse,
        enrollUserInCourse,
        unenrollUserFromCourse,
        unenrollAllUsersFromCourse
    };
}

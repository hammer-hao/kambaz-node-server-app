import model from './model.js';

export default function QuizzesDao() {
    async function addQuizForCourse(courseId, quiz) {
        return model.create({...quiz, course: courseId});
    }

    async function updateQuiz(quizId, quizUpdates) {
        return model.findByIdAndUpdate(quizId, quizUpdates, {new: true});
    }

    async function findQuizzesForCourse(courseId) {
        return model.find({course: courseId});
    }

    async function findQuizById(quizId) {
        return model.findById(quizId);
    }

    async function deleteQuiz(quizId) {
        return model.findByIdAndDelete(quizId);
    }

    async function publishQuiz(quizId) {
        return model.findByIdAndUpdate(quizId, {published: true}, {new: true});
    }

    async function unpublishQuiz(quizId) {
        return model.findByIdAndUpdate(quizId, {published: false}, {new: true});
    }

    return { addQuizForCourse, updateQuiz, findQuizzesForCourse, findQuizById, deleteQuiz, publishQuiz, unpublishQuiz };
}
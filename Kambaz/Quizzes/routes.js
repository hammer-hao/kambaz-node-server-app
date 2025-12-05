import QuizzesDao from './dao.js';
import QuestionsDao from '../Questions/dao.js';

export default function QuizzesRoutes(app) {
    const dao = QuizzesDao();
    const questionsDao = QuestionsDao();

    const createQuizForCourse = async (req, res) => {
        const { courseId } = req.params;
        const quiz = req.body;
        const added = await dao.addQuizForCourse(courseId, quiz);
        return res.json(added);
    }

    app.post("/api/courses/:courseId/quizzes", createQuizForCourse);

    const updateQuiz = async (req, res) => {
        const { quizId } = req.params;
        const updates = req.body;
        const updated = await dao.updateQuiz(quizId, updates);
        return res.json(updated);
    }

    app.put("/api/quizzes/:quizId", updateQuiz);

    const findQuizzesForCourse = async (req, res) => {
        const { courseId } = req.params;
        const quizzes = await dao.findQuizzesForCourse(courseId);
        return res.json(quizzes);
    }

    app.get("/api/courses/:courseId/quizzes", findQuizzesForCourse);

    const findQuizById = async (req, res) => {
        const { quizId } = req.params;
        const quiz = await dao.findQuizById(quizId);
        return res.json(quiz);
    }

    app.get("/api/quizzes/:quizId", findQuizById);

    const deleteQuiz = async (req, res) => {
        const { quizId } = req.params;
        const deleted = await dao.deleteQuiz(quizId);
        await questionsDao.removeAllQuestionsFromQuiz(quizId);
        return res.json(deleted);
    }

    app.delete("/api/quizzes/:quizId", deleteQuiz);

    const publishQuiz = async (req, res) => {
        const { quizId } = req.params;
        const published = await dao.publishQuiz(quizId);
        return res.json(published);
    }
    app.post("/api/quizzes/:quizId/publish", publishQuiz);

    const unpublishQuiz = async (req, res) => {
        const { quizId } = req.params;
        const unpublished = await dao.unpublishQuiz(quizId);
        return res.json(unpublished);
    }
    app.delete("/api/quizzes/:quizId/publish", unpublishQuiz);
}
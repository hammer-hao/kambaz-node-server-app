import questionsDao from './dao.js';

export default function QuestionsRoutes(app) {
    const dao = questionsDao();

    const getQuestionsForQuiz = async (req, res) => {
        const { quizId } = req.params;
        const questions = await dao.getQuestionsForQuiz(quizId);
        res.json(questions);
    }

    app.get("/api/quizzes/:quizId/questions", getQuestionsForQuiz);

    const addQuestionToQuiz = async (req, res) => {
        const { quizId } = req.params;
        const question = req.body;
        const added = await dao.addQuestionToQuiz(quizId, question);
        res.json(added);
    }

    app.post("/api/quizzes/:quizId/questions", addQuestionToQuiz);

    const updateQuestion = async (req, res) => {
        const { questionId } = req.params;
        const updates = req.body;
        const updated = await dao.updateQuestion(questionId, updates);
        res.json(updated);
    }

    app.put("/api/questions/:questionId", updateQuestion);

    const deleteQuestion = async (req, res) => {
        const { questionId } = req.params;
        const deleted = await dao.deleteQuestion(questionId);
        res.json(deleted);
    }

    app.delete("/api/questions/:questionId", deleteQuestion);
}
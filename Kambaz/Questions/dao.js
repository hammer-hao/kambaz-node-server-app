import model from "./model.js"

export default function questionsDao() {
    async function getQuestionsForQuiz(quizId) {
        return model.find({quizId: quizId});
    }

    async function addQuestionToQuiz(quizId, question) {
        return model.create({quizId: quizId, ...question});
    }

    async function updateQuestion(questionId, questionUpdates) {
        return model.findByIdAndUpdate(questionId, questionUpdates, {new: true});
    }

    async function deleteQuestion(questionId) {
        return model.findByIdAndDelete(questionId);
    }

    async function removeAllQuestionsFromQuiz(quizId) {
        return model.deleteMany({quizId: quizId});
    }

    return { getQuestionsForQuiz, addQuestionToQuiz, updateQuestion, deleteQuestion, removeAllQuestionsFromQuiz };
}
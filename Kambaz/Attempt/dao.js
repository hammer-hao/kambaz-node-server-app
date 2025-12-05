import AttemptModel from "./model.js";
import QuestionsModel from "../Questions/model.js";
import QuizzesModel from "../Quizzes/model.js";

// Grade one attempt on the server using questions
export default function AttemptDao() {
    async function gradeAttempt(quizId, rawAnswers) {
        const quiz = await QuizzesModel.findById(quizId);
        const questions = await QuestionsModel.find({ quizId }).lean();

        const totalPoints = questions.reduce((sum, q) => sum + (q.points ?? 1), 0);

        const answers = questions.map((q) => {
            const match = rawAnswers.find((a) => a.questionId === q._id);
            const pts = q.points ?? 1;

            if (!match) {
                return {
                    questionId: q._id,
                    type: q.type,
                    correct: false,
                    earnedPoints: 0,
                };
            }

            if (q.type === "MULTIPLE_CHOICE") {
                const correctIndicesRaw =
                    q.correctChoiceIndexes ??
                    (typeof q.correctChoiceIndex === "number"
                        ? [q.correctChoiceIndex]
                        : []);

                const correctSet = new Set(correctIndicesRaw);
                const answerSet = new Set(match.choiceIndexes ?? []);

                const correct =
                    correctSet.size > 0 &&
                    answerSet.size === correctSet.size &&
                    [...correctSet].every((idx) => answerSet.has(idx));

                return {
                    questionId: q._id,
                    type: q.type,
                    choiceIndexes: match.choiceIndexes ?? [],
                    correct,
                    earnedPoints: correct ? pts : 0,
                };
            }

            if (q.type === "TRUE_FALSE") {
                const correctBool = q.correctBool ?? true;
                const correct = match.value === correctBool;

                return {
                    questionId: q._id,
                    type: q.type,
                    value: match.value,
                    correct,
                    earnedPoints: correct ? pts : 0,
                };
            }

            // FILL_IN_BLANK
            const userText = (match.text ?? "").trim().toLowerCase();
            const correctAnswers = (q.blanks ?? []).map((b) =>
                b.trim().toLowerCase()
            );
            const correct =
                userText.length > 0 &&
                correctAnswers.some((c) => c === userText);

            return {
                questionId: q._id,
                type: q.type,
                text: match.text,
                correct,
                earnedPoints: correct ? pts : 0,
            };
        });

        const score = answers.reduce((sum, a) => sum + (a.earnedPoints ?? 0), 0);

        return { quiz, totalPoints, answers, score };
    }

    async function createAttempt(quizId, studentId, rawAnswers) {
        const { quiz, totalPoints, answers, score } = await gradeAttempt(
            quizId,
            rawAnswers
        );

        const attempt = await AttemptModel.create({
            quizId,
            studentId,
            totalPoints,
            score,
            answers,
        });

        return attempt;
    }

    async function findAttemptsForStudentQuiz(quizId, studentId) {
        return AttemptModel.find({ quizId, studentId }).sort({ submittedAt: 1 });
    }

    return {
        createAttempt,
        findAttemptsForStudentQuiz,
    };
}
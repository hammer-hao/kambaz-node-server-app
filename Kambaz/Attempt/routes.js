import express from "express";
import AttemptDao from "./dao.js";

function getCurrentUserId(req) {
    return req.session?.currentUser?._id || req.user?._id;
}

export default function AttemptsRoutes(app) {
    const dao = AttemptDao();

    const submitAttempt = async (req, res) => {
        try {
            const {quizId} = req.params;
            const studentId = getCurrentUserId(req);
            if (!studentId) {
                return res.status(401).send("Not logged in");
            }

            const rawAnswers = req.body.answers ?? [];

            const attempt = await dao.createAttempt(
                quizId,
                studentId,
                rawAnswers
            );

            res.json(attempt);
        } catch (e) {
            console.error(e);
            res.status(500).send("Failed to submit attempt");
        }
    }
    app.post("/api/quizzes/:quizId/attempts", submitAttempt);

    const getLastAttempt = async (req, res) => {
        try {
            const {quizId} = req.params;
            const studentId = getCurrentUserId(req);
            if (!studentId) {
                return res.status(401).send("Not logged in");
            }

            const attempts = await dao.findAttemptsForStudentQuiz(
                quizId,
                studentId
            );

            const attemptsUsed = attempts.length;
            const lastAttempt = attemptsUsed > 0 ? attempts[attemptsUsed - 1] : null;

            res.json({
                attemptsUsed,
                lastAttempt,
            });
        } catch (e) {
            console.error(e);
            res.status(500).send("Failed to load attempts");
        }
    }

    app.get("/api/quizzes/:quizId/attempts/me", getLastAttempt);

}

import PathParameters from "./PathParameters.js";
import QueryParameters from "./QueryParameters.js";
import WorkingWithObjects from "./workingWithObjects.js";
import Module from "./module.js";
import WorkingWithArrays from "./workingWithArrays.js";

export default function Lab5(app) {
    app.get("/lab5/welcome", (req, res) => {
        res.send("Welcome to Lab 5");
    });
    PathParameters(app);
    QueryParameters(app);
    WorkingWithObjects(app);
    Module(app);
    WorkingWithArrays(app);
};
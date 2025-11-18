let module = {
    id: "M101",
    name: "React Module",
    description: "Introduction to React and HTTP",
    course: "CS4550",
};

export default function Module(app) {
    // Retrieve whole module
    const getModule = (req, res) => {
        res.json(module);
    };

    // Retrieve module name
    const getModuleName = (req, res) => {
        res.json(module.name);
    };

    // Update module name
    const setModuleName = (req, res) => {
        const { newName } = req.params;
        module.name = newName;
        res.json(module);
    };

    // Update module description
    const setModuleDescription = (req, res) => {
        const { newDescription } = req.params;
        module.description = newDescription;
        res.json(module);
    };

    app.get("/lab5/module", getModule);
    app.get("/lab5/module/name", getModuleName);
    app.get("/lab5/module/name/:newName", setModuleName);
    app.get("/lab5/module/description/:newDescription", setModuleDescription);
}
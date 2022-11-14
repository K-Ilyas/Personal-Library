const empty = require("is-empty");



exports.requiredField = (data) => (req, res, next) => {

    if (req.body[data] && !empty(req.body[data]))
        next();
    else
        res.status(200).send(`missing required field ${data}`);
}


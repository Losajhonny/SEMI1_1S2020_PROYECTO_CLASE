const express = require("express");
const router = express.Router();

router.get("/", (req, res) => { res.status(200).send("Bienvenido al backend"); });

module.exports = router;

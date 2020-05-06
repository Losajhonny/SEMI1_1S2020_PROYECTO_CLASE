const express = require("express");
const router = express.Router();

const postTraducir = require("./../metodos/post-traducir");

router.get("/", (req, res) => { res.status(200).send("Bienvenido al backend"); });

router.post("/traducir", postTraducir);

module.exports = router;

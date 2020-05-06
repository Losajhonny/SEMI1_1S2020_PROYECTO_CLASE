const translate = require("./../aws_config").translate;
const AWS = require("aws-sdk");
const Translate = AWS.Translate(translate);

function postTraducir(req, res)
{
    const { texto, target } = req.body;

    let params = {
        Text: texto,
        SourceLanguageCode: "auto",
        TargetLanguageCode: target
    };

    Translate.translateText(params, (err, data) => {
        if(err) {
            console.log(err);
            console.log("Error al traducir mensaje");
            res.send({ status:500, data: "", message: "Error al traducir mensaje" });
        }
        else {
            console.log(data);
            console.log("Texto traducido");
            res.send({ status: 200, data: data, message: "Texto traducido" });
        }
    });
}

module.exports = postTraducir;

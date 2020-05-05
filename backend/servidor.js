const express = require("express");         //servidor
const app = express();                      //instancia de servidor
const routes = require("./routes/route");   //rutas
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

// settings
app.set('port', process.env.PORT || 3000);

// middleware
app.use(cors());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use(bodyParser.json({ limit: '50mb', extended: false }));
app.use((req, res, next) => {
    console.log(`********** ${req.method}${req.url}`);
    next();
});

// routes
app.use(routes);

app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});

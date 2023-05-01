const express = require("express");

const app = express();

app.use(express.static(__dirname + "/public/src"));

app.listen(3000, () => console.log("Server started"));

const { connect, connection } = require("mongoose");
const { DB_URL_CONNECT } = require("./utils/handleConfig.js");


(async () => await connect(DB_URL_CONNECT))();
connection.on("error", (error) => console.log(`Error DB ${error}`));
connection.on("connected", () => console.log("connected DB"));

const http = require("http");
const app = require("./app.js");
const { PORT } = require("./utils/handleConfig.js");

http.createServer(app).listen(PORT, () => require("./db.js"));

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const http_1 = require("http");
const server = (0, http_1.createServer)((_, res) => {
    res.end('Request accepted');
});
const DEFAULT_PORT = '4000';
const port = process.env.PORT || DEFAULT_PORT;
server.listen(port, () => {
    console.log(`SERVER IS RUNNING ON PORT ${port}`);
});

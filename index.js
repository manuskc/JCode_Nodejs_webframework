var server = require("./server");
var router = require("./router");
var requestHandler = require("./requestHandler");
var handle = {};


//define custom path if any
//The function that handles request to mentioned path must be defined in requestHandler and be exported
//Example:
// 
// handle["/"] = requestHandler.start;
//

//Send requested file
handle["showFile"] = requestHandler.showFile;

server.start(router.route, handle, 8080);


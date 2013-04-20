var fs = require("fs");
var vm = require("vm");

/**
 * Custom request hanler example
 *
function start(response, socketio) { 
	console.log("Request handler 'start' was called.");
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("Hello J coder!");
	response.end();
}
*/

var cache = {};
function showFile(fileName, request, response, socketio) {
	
	function addSlashes (string) {
		return '"'+string.replace(/\\/g, '\\\\').
			replace(/\u0008/g, '\\b').
			replace(/\t/g, '\\t').
			replace(/\n/g, '\\n').
			replace(/\f/g, '\\f').
			replace(/\r/g, '\\r').
			replace(/'/g, '\\\'').
			replace(/"/g, '\\"') + '"';
	}

	function showContent(data) {
		showFileContent(data);
	}

	var sandbox = {
			__request__ : request,
			__data__ : "",
			require : require,
			console : console,
			showContent : showContent
	};

	var mode;
	var fileType =  fileName.substring(fileName.lastIndexOf(".")+1).toLowerCase();
	if(fileType === "png"
			|| fileType === "jpg"
			|| fileType === "jpeg"
			|| fileType === "woff") {
		mode = "binary";
	} else {
		mode = "utf-8";
	}

	function showFileContent(content) {
		switch(fileType) {
			case "html" : 
			case "j" : 
				response.writeHead(200, {"Content-Type": "text/html","Cache-Control": "max-age=7200, public, must-revalidate" });
			break;
			case "js" : 
				response.writeHead(200, {"Content-Type": "text/javascript","Cache-Control": "max-age=290304000, public, must-revalidate" });
			break;
			case "css" :
				response.writeHead(200, {"Content-Type": "text/css","Cache-Control": "max-age=290304000, public, must-revalidate" });
			break;
			case "txt" :
				response.writeHead(200, {"Content-Type": "text/plain","Cache-Control": "max-age=290304000, public, must-revalidate" });
			break;
			case "woff" :
				response.writeHead(200, {"Content-Type": "font/woff","Cache-Control": "max-age=290304000, public, must-revalidate" });
			break;
			case "png" :
			case "jpg" :
			case "jpeg" :
				response.writeHead(200, {"Content-Type": "image/"+fileType,"Cache-Control": "max-age=290304000, public, must-revalidate" });
			break;
			default : //unknown content type
			response.writeHead(200, {"Cache-Control": "max-age=290304000, public, must-revalidate" });
		}
		response.write(content, mode);
		response.end();
	}

	if(typeof cache[fileName] === 'undefined') {
		var filePath = "./files/" + fileName; //file name can also be a path realtive from static file directory

		fs.exists( filePath, function(exists) { 
				if(exists) {
				fs.readFile(filePath, mode, function (err, data) { 
					if (err) throw err;
					if(fileType === "j") {
						//some extra processing is needed
						data = data.split("(%)").join("__~~~_THE_MOD_SYMBOL_~~~__");
						var jSplits = data.split("%");
						var jCode = "var __startCalled__ = false; function __start__() { __startCalled__ = true;} ";
						jCode += "function __print__(str) { __data__ += str;} ";
						jCode += "var __completeCalled__ = false; function __completed__() { if( __completeCalled__ === false) { __completeCalled__ = true; showContent(__data__);} } ";
						var i = 0;
						for(i = 0; i < jSplits.length; i++) {
							var split = jSplits[i];
							split = split.split("__~~~_THE_MOD_SYMBOL_~~~__").join("%");
							if(split.length >= 2 
								&& split.indexOf("<") == 0
								&& split.indexOf(">",split.length-1) != -1) {
									split = split.substring(1);
									split = split.substring(0,split.length-2);
									jCode += split; 
								} else {
									jCode += "__print__("+addSlashes(split)+");";
								}
						}
						jCode += " if(__startCalled__  === false) {  __completed__(); }";

						cache[fileName] = vm.createScript(jCode);
						cache[fileName].runInNewContext(sandbox);
					} else {
						showFileContent(data);
						cache[fileName] = data;
					}
					});
				} else {
				response.writeHead(404, {"Content-Type": "text/plain"});
				response.write("404 Not found");
				response.end();
				}
		});
	} else {
		if(fileType === "j") {
			cache[fileName].runInNewContext(sandbox);
		} else {
			showFileContent(cache[fileName]);
		}
	}
}

//
//Export custom request handler
//
//exports.start = start;

exports.showFile = showFile;


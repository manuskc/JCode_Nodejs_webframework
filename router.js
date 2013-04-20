var url = require("url");

function route(handle, request, response, socketio) {
	pathname = url.parse(request.url).pathname;
	//handle path ending with '/'
	if(pathname.length > 1 && pathname.charAt(pathname.length - 1)  === "/" ) {
		pathname = pathname.substring(0,pathname.length - 1);
	}
	console.log("About to route a request for " + pathname);
	if (typeof handle[pathname] === 'function') {
		handle[pathname](response, socketio); 
	} else {
		handle["showFile"](pathname.substring(pathname.indexOf("/")+1), request, response, socketio);
	}
} 

exports.route = route;

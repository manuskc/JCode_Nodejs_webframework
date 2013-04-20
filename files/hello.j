<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <title>Hello!</title>
</head>
<body>
	<p> Your url path is 
		%<
		// If your processing is synchronous, just write js code to be executed on server in symbol_percentage< code ... >symbol_percentage
		var url = require("url");


		//__print__() is the special function that needs to be called to print any thing from J code
		__print__('<h3>'+url.parse(__request__.url,true).href + '</h3>');

		//The J code can be split in this way too..
		var i = Math.floor((Math.random()*10));
		if( i == 5 ) {
		>%
		<h1>You are just lucky!! because %<__print__('random num = '+i);>%</h1>
		%<
		}
		>%
	</p>
</body>
</html>

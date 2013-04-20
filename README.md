JCode
=====

A simple `php like` web application development framework for nodejs


Philosophy!
===========

This project aims to bring php like simple interface for anyone to quickly build a simple web application using nodejs.
Using this, one can write both server server side javascript code and client side html/css/js in same file ( like the way we do in php). Also other static html, css, js etc files can be written as is.
But of course this has it's own downside and upsides, nevertheless this helped me learn a lot more on how web frameworks are built and the complexities involved in it.

How to use?
===========
* Edit index.js to select the port you want to run on ( default 8080 )
* Add all your files to `files` directory. This is complementary to `/var/www/` of php
* The server side code (let's call is JCode!) is to be written in `.j` files
* `.j` files can be thought as an extension of `.html` files. These can also contain code that has to be exected on server. All snippets of JCode in the html must be enclosed with '%< ... >%' ( like in `.php` we enclose server side code in '<?php ... ?>' )
* To print some content via server side code - use `__print__(string);` function
* Because, lot of functions can be asynchronous, if your JCode contains any asynchronous code, you need to inform JCode processor to wait till your code execution completes:
* Call `__start__();` at the beginning of JCode to indicate that your JCode file has asynchronous funcitons.
* Call `__completed__();` at the end, when all of your asynchronous functions completes execution.
* All `__print__()`s and html snippets are sent as response once `__completed__()` is called
* In your JCode use `(%)` instead of `%` if you need to use percentage symbol
* 
* Start server : `node index.js`
* Visit : http://localhost:8080/<filename>     (filename relative from `files` directory)


Known issues
============
* index.html/index.j are not picked up as default
* The responses are cached to improve performace, if you do any changes to `files` you will have to restart server
* Security? No idea - I just built this more as a fun weekend project and I love it!
* Any more bugs/feedback? reach me at manu.skc@gmail.com

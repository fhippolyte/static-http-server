var static = require('node-static');

//
// Create a node-static server to serve the current directory
//
var staticServer = new static.Server('./public', { cache: 7200, headers: {'X-Hello':'World!'} });

require('http').createServer(function (request, response) {
    staticServer.serve(request, response, function (err, res) {
        if (err) { // An error as occured
            console.error("> Error serving " + request.url + " - " + err.message);


			if (err && (err.status === 404)) { // If the file wasn't found 
                staticServer.serveFile('/error-pages/404.html', 404, {}, request, response);
			} else if (err && (err.status === 500)) { 
                staticServer.serveFile('/error-pages/500.html', 500, {}, request, response);            
            } else {
            	response.writeHead(err.status, err.headers);
            	response.end();           	
            }

        } else { // The file was served successfully
            console.log("[" + new Date().toLocaleString() + "] " + request.url + " " + res.status + " " + request.headers['user-agent']);
        }
    });
}).listen(8080);

console.log("> node-static is listening on http://127.0.0.1:8080");
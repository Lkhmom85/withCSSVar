// This serve a little page on port 4000.
var http = require('http'),
    fs = require('fs'),
    host = '0.0.0.0',
    port = 4000,
    handler = function (req, res) {
        console.log(req.url);
        if (req.url === '/withCSSVar') {
            var content = fs.readFileSync(__dirname + '/../withCSSVar.js', 'utf-8');
            res.writeHead(200,'ok',{'Content-Type': 'text/javascript'});
    
            res.end(content);
            return;
        }
        // Always reload from disk.
        var content = fs.readFileSync(__dirname + '/index.html', 'utf-8');
        res.writeHead(200);
        res.end(content);
    },
    server = http.createServer(handler).listen(port, host, () => {
        console.log(`Server is running on http://${host}:${port}`);
    });


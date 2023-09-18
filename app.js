const listen = 8081;
const express = require('express');
const app = express();
const R = require('r-script');

// -------------------------------------------- routes
app.get('/', function(req, res) {
    res.send(`
    R Syncronize- 
    <a href="http://localhost:8081/ex-async"> 
    http://localhost:${listen}/r-async/{script}</a>
    <br><br>
    R Asyncronize- 
    <a href="http://localhost:8081/ex-async"> 
    http://localhost:${listen}/r-async/{script}</a>
    `);
});

//ex-sync.R
app.get('/r-sync/:file', function(req, res) {
    try {
        var result = R("R-Sync/" + req.params.file + ".R")
            .data("hello world", 20)
            .callSync();
        res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error.toString());
    }
});

//'ex-async.R'
app.get('/r-async/:file', function(req, res) {
    executeExAsync(req.params.file, function(error, result) {
        if (error) {
            return res.status(500).json(error.toString());
        }
        return res.status(200).json(result);
    });
});

// -------------------------------------------- controllers
function executeExAsync(script, callback) {
    const attitude = [
        { group: '(40,55]', rating: 46.7143, advance: 41.1429 },
        { group: '(55,70]', rating: 64.6154, advance: 41.9231 },
        { group: '(70,85]', rating: 77.2, advance: 45.5 }
    ];
    R("R-Async/" + req.script + ".R")
        .data({ df: attitude, nGroups: 3, fxn: 'mean' })
        .call(function(error, result) {
            if (error) {
                console.error('ex-async throws error', error.toString());
                return callback(error, null);
            }
            console.error('ex-async success result', result);
            return callback(null, result);
        });
}

// -------------------------------------------- Server Start
const server = app.listen(listen, function() {
    const port = server.address().port;
    console.log(`R Server Listening at http://localhost:${port}`);
});
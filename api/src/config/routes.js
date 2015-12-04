


module.exports = function(app, express){

    // CONFIG INCLUDES
    //var db            = require('./database');


    // PROPERTIES
    var independentSource = null; // An array of additional source files if needed. TODO: Move to config?


    // ==============================================================================================================
    // HOME ---------------------------------------------------------------------------------------------------------
    
    app.get('/', function(req, res) {
        res.render('index', { independentSource : independentSource });
    });


    app.get('/stream', function(req, res) {
            var fileSystem = require('fs'),
                path       = require('path'),
                filePath   = path.join(__dirname, '../../media/09 And War (feat. Molly Dean).mp3'),
                // filePath   = path.join(__dirname, '../../media/02 Naysayer.mp3'),
                stat       = fileSystem.statSync(filePath);

            res.writeHead(200, {
                'Content-Type': 'audio/mpeg',
                'Content-Length': stat.size
            });

            var readStream = fileSystem.createReadStream(filePath);
            readStream.pipe(res);
    });



    // ==============================================================================================================
    // 404 ----------------------------------------------------------------------------------------------------------

    /*app.use(function(req, res, next) {

        // Unregistered mapping? Send 404 response
        res.status(404).render('404');
    });*/

};
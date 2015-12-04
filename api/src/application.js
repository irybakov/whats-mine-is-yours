


// INSTANCES
var express  = require('express'),                  // Load up Express
    app      = express(),                           // Instantiate Express
    server   = require('http').createServer(app),   // Instantiate server
    io       = require('socket.io')(server);        // Start them sockets


// PROPERTIES
var port            = 3000;                         // Port to launch


// CONFIG INCLUDES
require('./config/config')(app);                    // Handlebars configuration
require('./config/routes')(app, express);           // URL mapping




// =====================================================================================================================
// CONSTRUCTOR ---------------------------------------------------------------------------------------------------------

server.listen(port, _init);


// =====================================================================================================================
// INTERNAL INTERFACE --------------------------------------------------------------------------------------------------

/**
 * Init
 * 
 */
function _init() {
	// lets go
}


// =====================================================================================================================
// EVENT INTERFACE -----------------------------------------------------------------------------------------------------

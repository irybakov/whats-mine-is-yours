


var handlebars = require('express3-handlebars'),
    express    = require('express');


module.exports = function(app){

    // Configure Handlebars 
    app.engine('html', handlebars({ 
        // defaultLayout: 'main',
        // extname: ".html",
        layoutsDir: __dirname + '/../views/layouts'
    }));
    
    app.set('view engine', 'html');                             // Set .html as the default template extension 
    app.set('views', __dirname + '/../views');                  // Tell express where it can find the templates
    app.use(express.static(__dirname + './../../client'));      // Make the files in the public folder available to the world
    app.use(express.urlencoded());                              // Parse POST request data. It will be available in the req.body object
};
